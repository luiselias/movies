import type { DatabaseManager } from '../manager/interface';
import type { MoviePersistence } from '../../../service/movies/interface';
import type { Movie, WinnersYearRangeDB } from '../../../types/index';

import DatabaseManagerFactory from '../manager/factory.js';

class MoviePersistenceImpl implements MoviePersistence {
    private _db: DatabaseManager;

    constructor() {
        this._db = DatabaseManagerFactory.getInstance();
        this._db.connect();
    }

    async getAllMovies(): Promise<Movie[]> {
        const dbClient = await this._db.getDbClient();
        return dbClient.prepare('SELECT * FROM movies').all() as Movie[];
    }

    async getWinnersYear(): Promise<Movie[]> {
        const dbClient = await this._db.getDbClient();
        return dbClient.prepare('SELECT * FROM movies WHERE winner = ?').all('yes') as Movie[];
    }

    async getWinnersYearRange(): Promise<WinnersYearRangeDB[]> {
        const dbClient = await this._db.getDbClient();
        const producerIntervals = dbClient.prepare(`
            SELECT m1.producers as producer, m1.year as firstWin, MIN(m2.year) as nextWin, (MIN(m2.year) - m1.year) as interval
            FROM movies m1
            JOIN movies m2 ON m1.producers = m2.producers AND m2.year > m1.year
            WHERE m1.winner = ? AND m2.winner = ?
            GROUP BY m1.producers, m1.year
            HAVING interval > 0
            ORDER BY interval ASC
        `).all('yes', 'yes') as WinnersYearRangeDB[];
        
        return producerIntervals;
    };
}

export default MoviePersistenceImpl;
