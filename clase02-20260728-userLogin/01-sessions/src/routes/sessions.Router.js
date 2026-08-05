import { Router } from 'express';
import { SessionsController } from '../controller/sessionsController.js';
export const router=Router()

router.post('/register', SessionsController.register)
router.post('/login', SessionsController.login)

