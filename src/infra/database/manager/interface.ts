import { Movie } from "../../../types/index";

export interface DatabaseClient {
    find(query: string): Promise<Movie[]>;
}

export interface DatabaseManager {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getDbClient(): DatabaseClient;
}
