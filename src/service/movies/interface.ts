import { Movie, WinnersYearRange } from '../../types/index';

export interface MovieService {
    getAllMovies(): Promise<Movie[]>;
    getWinnersYear(): Promise<Movie[]>;
    getWinnersYearRange(): Promise<WinnersYearRange>;
}

export interface MoviePersistence {
    getAllMovies(): Promise<Movie[]>;
    getWinnersYear(): Promise<Movie[]>;
}
