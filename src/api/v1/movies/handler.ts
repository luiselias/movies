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

export default { getAllMovies };
