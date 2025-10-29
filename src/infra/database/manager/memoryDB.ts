import type { DatabaseClient, DatabaseManager } from './interface';

class MemoryDB implements DatabaseManager {
    private dbClient: DatabaseClient;

    constructor() {
        this.dbClient = {
            find: async (query: string) => {
                return [];
            },
        };
    }

    async connect(): Promise<void> {
        console.log('Connected to MemoryDB');
    }

    async disconnect(): Promise<void> {
        console.log('Disconnected from MemoryDB');
    }

    getDbClient(): any {
        return this.dbClient;
    }
}

export { MemoryDB };