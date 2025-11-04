import type { Movie, WinnersYearRange, WinnersYearRangeDB } from '../../types/index.js';
import type { MovieService } from './interface.js';

import MoviesDatabase from '../../infra/database/movies/index.js';

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

    private parseWinner(winner: WinnersYearRangeDB) {
        return {
            producer: winner.producer,
            interval: winner.interval,
            previousWin: Number(winner.firstWin),
            followingWin: Number(winner.nextWin),
        };
    }

    private makeResultWinnersYearRange(winners: WinnersYearRangeDB[]): WinnersYearRange {
        const result: WinnersYearRange = { min: [], max: [] };
        if (winners?.length > 3) {
            const firstWin = this.parseWinner(winners[0]);
            const secondWin = this.parseWinner(winners[1]);

            const penultimateWin = this.parseWinner(winners[winners.length - 2]);
            const lastWin = this.parseWinner(winners[winners.length - 1]);

            result.min.push(firstWin);
            result.min.push(secondWin);
            result.max.push(penultimateWin);
            result.max.push(lastWin);

            return result;
        }

        return result;
    }

    async getWinnersYearRange(): Promise<WinnersYearRange> {
        const winners = await this._database.getWinnersYearRange();
        return this.makeResultWinnersYearRange(winners);
    }
}
export default MovieServiceImpl;