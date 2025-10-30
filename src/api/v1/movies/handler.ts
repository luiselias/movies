import type { Movie } from '../../../types/index.js';

import { Request, Response } from 'express';

import MoviesService from '../../../service/movies/index.js';
const moviesService = new MoviesService();

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
	const movies: Movie[] = await moviesService.getAllMovies();
	res.status(200).json({
		success: true,
		data: movies,
		count: movies.length
	});
};

const getWinnersYear = async (req: Request, res: Response): Promise<void> => {
	const winners = await moviesService.getWinnersYear();
	res.status(200).json({
		success: true,
		data: winners,
		count: winners.length
	});
};

const getWinnersYearRange = async (req: Request, res: Response): Promise<void> => {
	const range = await moviesService.getWinnersYearRange();
	res.status(200).json(range);
};

export default { getAllMovies, getWinnersYear, getWinnersYearRange };
