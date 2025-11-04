import { Movie, WinnersYearRange, WinnersYearRangeDB } from '../../types/index';

export interface MovieService {
    getAllMovies(): Promise<Movie[]>;
    getWinnersYear(): Promise<Movie[]>;
    getWinnersYearRange(): Promise<WinnersYearRange>;
}

export interface MoviePersistence {
    getAllMovies(): Promise<Movie[]>;
    getWinnersYear(): Promise<Movie[]>;
    getWinnersYearRange(): Promise<WinnersYearRangeDB[]>
}
