import { Database } from "better-sqlite3";

export interface DatabaseManager {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getDbClient(): Database;
}

export interface DatabaseManagerFactory {
    getInstance(): DatabaseManager;

}
