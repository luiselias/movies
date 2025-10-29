import type { Movie, WinnersYearRange } from '../../types/index';
import type { MovieService } from "./interface";

class MovieServiceImpl implements MovieService {
    async getAllMovies(): Promise<Movie[]> {
        return [];
    }

    async getWinnersYear(): Promise<Movie[]> {
        return [];
    }

    async getWinnersYearRange(): Promise<WinnersYearRange> {
        return {
            min: [
                {
                    producer: 'Producer 1',
                    interval: 1,
                    previousWin: 2008,
                    followingWin: 2009
                },
                {
                    producer: 'Producer 2',
                    interval: 1,
                    previousWin: 2018,
                    followingWin: 2019
                }
            ],
            max: [
                {
                    producer: 'Producer 1',
                    interval: 99,
                    previousWin: 1900,
                    followingWin: 1999
                },
                {
                    producer: 'Producer 2',
                    interval: 99,
                    previousWin: 2000,
                    followingWin: 2099
                }
            ]
        };
    }
}
export { MovieServiceImpl };