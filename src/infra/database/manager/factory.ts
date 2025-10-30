import type { DatabaseManager } from './interface.js';

import { MemoryDB } from './memoryDB.js';

class DatabaseManagerFactory {
      private static instance: DatabaseManager;

    private static getTypeDatabase(): string {
        return 'memoryDB';
    }

    static getInstance(): DatabaseManager {
        if (!DatabaseManagerFactory.instance) {
            const typeDB = DatabaseManagerFactory.getTypeDatabase();
            switch (typeDB) {
                case 'memoryDB':
                    DatabaseManagerFactory.instance = new MemoryDB();
                    break;
                //TODO: implemetação de outros tipos de DB, como só tem um nem faz sentido
                //lançar erro no default
            }
        }

        return DatabaseManagerFactory.instance;
    }
}
export default DatabaseManagerFactory;