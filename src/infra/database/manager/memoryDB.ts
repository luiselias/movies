import type { DatabaseManager } from './interface.js';

import fs from 'fs';
import path from 'path';
import DatabaseSQL, { Database } from 'better-sqlite3';

class MemoryDB implements DatabaseManager {
    private dbClient: Database;
    static isLoaded: boolean = false;

    constructor() {
        this.dbClient = new DatabaseSQL(':memory:');;
    }

    async loadData() {
        if (MemoryDB.isLoaded) {
            return;
        }

        const projectRoot = process.cwd();
        const csvPath = path.join(projectRoot, 'src/infra/initial-data/Movielist.csv');
        const csv = fs.readFileSync(csvPath, 'utf-8');
        const lines = csv.split('\n');
        const columns = lines[0].split(';');

        const createTableQuery = `CREATE TABLE movies (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columns.map((col: string) => `${col.trim()} TEXT`).join(', ')})`;

        this.dbClient.exec(createTableQuery);

        const insertQuery = `INSERT INTO movies (${columns.map((col: string) =>
            col.trim()).join(', ')}) VALUES (${columns.map(() => '?').join(', ')});`;

        const insertStmt = this.dbClient.prepare(insertQuery);

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(';').map((value: string) => value.trim());
            if (values.length === columns.length) {
                const producers = values[3].split(',')
                    .map(p => p.trim())
                    .map(p => p.split('and').map(n => n.trim()))
                    .flat();

                producers.forEach(producer => {

                    if (producer === '') {
                        return;
                    }

                    const newValues = [...values];
                    newValues[3] = producer;
                    insertStmt.run(newValues);
                });
            }
        }
        MemoryDB.isLoaded = true;
    }

    async connect(): Promise<void> {
        await this.loadData();
    }

    async disconnect(): Promise<void> {
        this.dbClient.close();
    }

    getDbClient(): Database {
        if (!MemoryDB.isLoaded) {
            throw new Error('O dados não foram carregados.');
        }
        return this.dbClient;
    }
}

export { MemoryDB };