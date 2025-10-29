import type { DatabaseManager } from "./interface";

import { MemoryDB } from "./memoryDB";

class DatabaseManagerFactory {
    private static getTypeDatabase(): string {
        return 'memoryDB'; 
    }
    static create(): DatabaseManager {
        const typeDB = DatabaseManagerFactory.getTypeDatabase();
        switch (typeDB) {
            case 'memoryDB':
                return new MemoryDB();
            default:
                throw new Error(`Database type ${typeDB} not supported.`);
        }
    }
}
export { DatabaseManagerFactory };