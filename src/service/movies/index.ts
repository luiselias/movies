import type { Movie, WinnersYearRange } from '../../types/index.js';
import type { MovieService } from './interface.js';

import MoviesDatabase from '../../infra/database/movies/index.js';

type ProducerEntry = { data: { position: number, year: number }[], interval?: number };

class MovieServiceImpl implements MovieService {
    private _database: MoviesDatabase;
    constructor() {
        this._database = new MoviesDatabase();
    }

    async getAllMovies(): Promise<Movie[]> {
        return this._database.getAllMovies();
    }

    async getWinnersYear(): Promise<Movie[]> {
        return this._database.getWinnersYear();
    }

    private getWinnersMoreThanOnce(allWinners: Movie[]) {
        const winnersInitialData: { [key: string]: ProducerEntry } = {};

        allWinners.forEach((movie, index) => {
            const producersNames = movie.producers.split(',')
                .map(p => p.trim())
                .map(p => p.split(' and ').map(n => n.trim()))
                .flat();

            producersNames.forEach(name => {
                if (!winnersInitialData[name]) {
                    winnersInitialData[name] = { data: [] };
                }
                winnersInitialData[name].data.push({ position: index, year: Number(movie.year) });
            });
        });

        const winnersMoreOneTimeNames = Object.keys(winnersInitialData)
            .filter(name => winnersInitialData[name].data.length > 1);

        const winnwersMoreThanOnce: { [key: string]: ProducerEntry } = winnersMoreOneTimeNames.reduce((result, name) => {
            result[name] = winnersInitialData[name];
            return result;
        }, {} as { [key: string]: ProducerEntry });

        return winnwersMoreThanOnce;
    }

    private sortWinnersByInterval(winnersMoreThanOnce: { [key: string]: ProducerEntry }) {
        Object.keys(winnersMoreThanOnce).forEach(winner => {
            const entriesData = winnersMoreThanOnce[winner].data;
            winnersMoreThanOnce[winner].data = entriesData.sort((a, b) => a.year - b.year);
            const intervals = [];
            for (let i = 1; i < entriesData.length; i++) {
                const interval = entriesData[i].year - entriesData[i - 1].year;
                intervals.push(interval);
            }
            winnersMoreThanOnce[winner].interval = Math.min(...intervals);
        });

        const winnersSorted = Object.entries(winnersMoreThanOnce).sort((a, b) => {
            return (a[1].interval! - b[1].interval!);
        });

        return winnersSorted;
    }

    private makeResultWinnersYearRange(winnersSortedByInterval: [string, ProducerEntry][]): WinnersYearRange {
        const winnersFinal = winnersSortedByInterval.map(entry => ({
            producer: entry[0],
            interval: entry[1].interval!,
            previousWin: entry[1].data[0].year,
            followingWin: entry[1].data[1].year
        }));

        const result: WinnersYearRange = { min: [], max: [] };
        if (winnersFinal.length > 3) {
            result.min.push(winnersFinal[0]);
            result.min.push(winnersFinal[1]);
            result.max.push(winnersFinal[winnersFinal.length - 2]);
            result.max.push(winnersFinal[winnersFinal.length - 1]);
            return result;
        }

        return result;
    }

    async getWinnersYearRange(): Promise<WinnersYearRange> {
        const winners = await this._database.getWinnersYear();
        const winnersMoreThanOnce = this.getWinnersMoreThanOnce(winners);
        const winnersSortedByInterval = this.sortWinnersByInterval(winnersMoreThanOnce);

        return this.makeResultWinnersYearRange(winnersSortedByInterval);
    }
}
export default MovieServiceImpl;