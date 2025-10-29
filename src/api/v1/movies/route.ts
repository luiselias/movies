import { Router } from 'express';

import handler from './handler.js';

const router = Router();

router.get('/api/v1/movies', handler.getAllMovies);

export default router;
