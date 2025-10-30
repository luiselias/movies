import type { DatabaseManager } from '../manager/interface';
import type { MoviePersistence } from '../../../service/movies/interface';
import type { Movie } from '../../../types/index';

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
}

export default MoviePersistenceImpl;
