import { Router } from 'express';

import authRouter from './entities/auth/router';
import courseRouter from './entities/course/router';
import courseSchedRouter from './entities/courseSched/router';
import fsrRouter from './entities/fsr/router';
import serviceRouter from './entities/extensionAndCommunityService/router';
import subjectRouter from './entities/subject/router';
import userRouter from './entities/user/router';
import awardRouter from './entities/award/router';

const router = Router();

router.use(authRouter);

// router.use( (req,res,next) => {
//   if(req.session.user){
//     return next;
//   }
//   res.status(401).json({
//     status:401,
//     message: 'You must be logged in',
//   });
// });
router.use(courseRouter);
router.use(courseSchedRouter);
router.use(fsrRouter);
router.use(serviceRouter);
router.use(subjectRouter);
router.use(awardRouter);

// router.use( (req,res,next) => {
//   if(req.session.user.acctType == 'ADMIN'){
//     return next;
//   }
//   res.status(403).json({
//     status:403,
//     message: 'Forbidden access',
//   });
// });

router.use(userRouter);

export default router;
