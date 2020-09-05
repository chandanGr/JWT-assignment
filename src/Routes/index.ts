import express from 'express';

import authUsers from './authUsers';

const router = express.Router();

router.use('/auth', authUsers);

export default router;
