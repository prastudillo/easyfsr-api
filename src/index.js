import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import store from 'express-mysql-session';
import db from './database';
import router from './router';
import fileupload from 'express-fileupload';

const app = express();
const MySQLStore = store(session);
const sessionStore = new MySQLStore({}, db);

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

/**
 * Session configurations for express and MariaDB
 * The package will automatically create a table for sessions
 * to persist session data.
 */
app.use(
  session({
    key: 'fsrmgtsys',
    secret: 'fsrmgtsys',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    createDatabaseTable: true,
    checkExpirationInterval: 9000000,
    expiration: 86400000,
  }),
);

/**
 * The documentation will be served at /docs. All API
 * functionalities will be prefixed with /api route.
 */
app.use('/uploads/', express.static(__dirname + '/../public/uploads'));
app.use('/docs', express.static(__dirname + '/../docs'));
app.use('/api', router);
app.use(express.static(__dirname + '/../client'));

app.use('*', (req, res) => res.redirect('/'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
