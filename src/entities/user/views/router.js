import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/user/:employeeID/award', async (req, res) => {
  try {
    const awards = await Ctrl.getUserAwards(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched awards of user',
      data: awards,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user awards',
    });
  }
});

router.get('/user/:employeeID/research', async (req, res) => {
  try {
    const research = await Ctrl.getUserResearch(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research of user',
      data: research,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user research',
    });
  }
});

router.get('/user/:employeeID/adminWork', async (req, res) => {
  try {
    const adminWorks = await Ctrl.getUserAdminWork(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched admin works of user',
      data: adminWorks,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user admin works',
    });
  }
});

router.get('/user/:employeeID/studyLoad', async (req, res) => {
  try {
    const studyLoad = await Ctrl.getUserStudyLoad(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched study loads of user',
      data: studyLoad,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user admin works',
    });
  }
});

router.get('/user/:employeeID/schedule', async (req, res) => {
  try {
    const subjects = await Ctrl.getUserSubject(req.params);
    const consultationHours = await Ctrl.getUserConsultationHours(req.params);
    const courses = await Ctrl.getSLCourse(req.params);
    const schedule = [...subjects, ...consultationHours, ...courses];
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched schedule',
      data: schedule,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message:
        'Internal server error while getting user extension and community service',
    });
  }
});

router.get(
  '/user/:employeeID/extensionAndCommunityService',
  async (req, res) => {
    try {
      const extensionAndCommunityService = await Ctrl.getUserExtensionAndCommunityService(
        req.params,
      );
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched extension and community service of user',
        data: extensionAndCommunityService,
      });
    } catch (err) {
      res.status(status).json({
        status,
        message:
          'Internal server error while getting user extension and community service',
      });
    }
  },
);

router.get('/user/:employeeID/limitedPracticeOfProf', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getUserLimitedPractice(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched limited practices of user',
      data: limitedPracticeOfProf,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user limited practices',
    });
  }
});

router.get('/user/:employeeID/creativeWork', async (req, res) => {
  try {
    const creativeWorks = await Ctrl.getUserCreativeWork(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched creative works of user',
      data: creativeWorks,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user creative works',
    });
  }
});

export default router;
