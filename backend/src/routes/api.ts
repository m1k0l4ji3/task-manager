import { Router } from 'express';
import TaskController from '../controllers/task.controller.js';
import { rateLimiter } from '../middlewares/rate-limiter.js';

const router = Router();

router.get('/task', rateLimiter, TaskController.list);
router.get('/task/:id', rateLimiter, TaskController.details);
router.post('/task', rateLimiter, TaskController.create);
router.put('/task/:id', rateLimiter, TaskController.update);
router.delete('/task/:id', rateLimiter, TaskController.delete);

export default router;
