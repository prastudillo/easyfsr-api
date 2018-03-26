import { Router } from 'express';

import authRouter from './entities/auth/router';
import awardRouter from './entities/award/router';
import fsrRouter from './entities/fsr/router';
import serviceRouter from './entities/extensionAndCommunityService/router';
import userRouter from './entities/user/router';
import researchRouter from './entities/research/router';
import rCoAuthorRouter from './entities/rCoAuthor/router';

const router = Router();

router.use(authRouter);

// router.use( (req,res,next) => {
//   if(req.session.user.acctType == 'ADMIN'){
//     return next;
//   }
//   res.status(403).json({
//     status:403,
//     message: 'Forbidden access',
//   });
// });

router.use(awardRouter);
router.use(fsrRouter);
router.use(serviceRouter);

// router.use( (req,res,next) => {
//   if(req.session.user){
//     return next;
//   }
//   res.status(401).json({
//     status:401,
//     message: 'You must be logged in',
//   });

// });]

router.use(researchRouter);
router.use(rCoAuthorRouter);

// });
router.use(userRouter);

export default router;
