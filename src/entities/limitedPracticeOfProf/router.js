import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

router.get('/limitedPracticeOfProf/:id', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProf(
      req.params,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched limited practice of prof',
      data: limitedPracticeOfProf,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
