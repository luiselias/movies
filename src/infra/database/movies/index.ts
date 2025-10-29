import type { DatabaseManager } from "../manager/interface";
import type { MoviePersistence } from "../../../service/movies/interface";
import type { Movie, WinnersYearRange } from "../../../types/index";

import { DatabaseManagerFactory } from "../manager/factory";


class MoviePersistenceImpl implements MoviePersistence {
    private _db: DatabaseManager;

    constructor() {
        this._db = DatabaseManagerFactory.create();
        this._db.connect();
    }
    async getAllMovies(): Promise<Movie[]> {
        const dbClient = this._db.getDbClient();
        return dbClient.find('');
    }
    async getWinnersYear(): Promise<Movie[]> {
        const dbClient = this._db.getDbClient();
        return dbClient.find('');
    }
    async getWinnersYearRange(): Promise<WinnersYearRange> {
        const dbClient = this._db.getDbClient();
        return dbClient.find('');
    }
}

export default MoviePersistenceImpl;
