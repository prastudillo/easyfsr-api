import { Router } from 'express';

import authRouter from './entities/auth/router';
import awardRouter from './entities/award/router';
import subjectRouter from './entities/subject/router';
import timeslotRouter from './entities/timeslot/router';
import courseRouter from './entities/course/router';
import courseSchedRouter from './entities/courseSched/router';
import fsrRouter from './entities/fsr/router';
import limitedPracticeOfProfRouter from './entities/limitedPracticeOfProf/router';
import serviceRouter from './entities/extensionAndCommunityService/router';
import userRouter from './entities/user/router';
import researchRouter from './entities/research/router';
import rCoAuthorRouter from './entities/rCoAuthor/router';
import adminWorkRouter from './entities/adminWork/router';
import creativeWorkRouter from './entities/creativeWork/router';
import userViewRouter from './entities/user/views/router';
import announcementRouter from './entities/announcement/router';

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
router.use(userViewRouter);
router.use(awardRouter);
router.use(courseRouter);
router.use(courseSchedRouter);
router.use(fsrRouter);
router.use(limitedPracticeOfProfRouter);
router.use(serviceRouter);
router.use(timeslotRouter);
router.use(subjectRouter);
router.use(creativeWorkRouter);
// router.use( (req,res,next) => {
//   if(req.session.user.acctType == 'ADMIN'){
//     return next;
//   }
//   res.status(403).json({
//     status:403,
//     message: 'Forbidden access',
//   });

// });]

router.use(researchRouter);
router.use(rCoAuthorRouter);

// });

router.use(announcementRouter);
router.use(userRouter);
router.use(adminWorkRouter);

export default router;
