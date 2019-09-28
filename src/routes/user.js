import { Router } from 'express';

import { userLogin } from '../actions/user';

const router = Router();

router.post('/login', userLogin);

export const user = router;
