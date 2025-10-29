import { Request, Response } from 'express';

import { Movie } from '../../../types/index';

const movies: Movie[] = [];

export const getAllMovies = (req: Request, res: Response): void => {
	try {
		res.status(200).json({
			success: true,
			data: movies,
			count: movies.length
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Erro interno do servidor',
			error: error instanceof Error ? error.message : 'Erro desconhecido'
		});
	}
};

const getWinnersYear = (req: Request, res: Response): void => {
	const winners = movies;
	res.status(200).json({
		success: true,
		data: winners,
		count: winners.length
	});
};

const getWinnersYearRange = (req: Request, res: Response): void => {
	res.status(200).json({
		"min": [
			{
				"producer": "Producer 1",
				"interval": 1,
				"previousWin": 2008,
				"followingWin": 2009
			},
			{
				"producer": "Producer 2",
				"interval": 1,
				"previousWin": 2018,
				"followingWin": 2019
			}
		],
		"max": [
			{
				"producer": "Producer 1",
				"interval": 99,
				"previousWin": 1900,
				"followingWin": 1999
			},
			{
				"producer": "Producer 2",
				"interval": 99,
				"previousWin": 2000,
				"followingWin": 2099
			}
		]
	});
};

export default { getAllMovies, getWinnersYear, getWinnersYearRange };
