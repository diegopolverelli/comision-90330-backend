import { Router } from 'express';
import { eventsController } from '../controller/index.js';
export const router=Router()

router.get('/', eventsController.getEventos)
router.post('/', eventsController.createEvent)