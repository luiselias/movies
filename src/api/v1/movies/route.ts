import { Router } from 'express';

import handler from './handler.js';

const router = Router();

router.get('/api/v1/movies', handler.getAllMovies);
router.get('/api/v1/movies/winners', handler.getWinnersYear);
router.get('/api/v1/movies/winners/range', handler.getWinnersYearRange);

export default router;
