import express from 'express';
import { loginUser } from '../Controllers/loginUser';
import { signinUser } from '../Controllers/signinUser';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signin', signinUser);

export default router;
