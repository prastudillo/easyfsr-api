import { Router } from 'express';

import authRouter from './entities/auth/router';
import awardRouter from './entities/award/router';
import courseRouter from './entities/course/router';
import courseSchedRouter from './entities/courseSched/router';
import fsrRouter from './entities/fsr/router';
import limitedPracticeOfProfRouter from './entities/limitedPracticeOfProf/router';
import serviceRouter from './entities/extensionAndCommunityService/router';
import subjectRouter from './entities/subject/router';
import userRouter from './entities/user/router';

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
router.use(awardRouter);
router.use(courseRouter);
router.use(courseSchedRouter);
router.use(fsrRouter);
router.use(limitedPracticeOfProfRouter);
router.use(serviceRouter);
router.use(subjectRouter);
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
