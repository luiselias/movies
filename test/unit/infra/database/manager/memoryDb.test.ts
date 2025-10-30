import { MemoryDB } from '../../../../../src/infra/database/manager/memoryDB.js';

describe('Módulo de infra do memoryDB', () => {
    const resetScenario = () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    };

    beforeAll(() => {
        resetScenario();
    });

    beforeEach(() => {
        resetScenario();
    });

    afterAll(() => {
        resetScenario();
    });

    it('deve criar uma instância do db', () => {
        const db = new MemoryDB();
        expect(db).toBeInstanceOf(MemoryDB);
    });

    it('deve lançar um erro se tentar pegar a instancia sem conectar', () => {
        const db = new MemoryDB();
        expect(() => db.getDbClient()).toThrow('O dados não foram carregados.');
    });

    it('deve ser possível chamar o connect várias vezes sem lançar erros', async () => {
        const db = new MemoryDB();
        await expect(() => db.connect()).resolves.toBeUndefined();
        await expect(() => db.connect()).resolves.toBeUndefined();
        await expect(() => db.connect()).resolves.toBeUndefined();
    });

    it('deve ser possível chamar o disconnect sem lançar erros', async () => {
        const db = new MemoryDB();
        await expect(() => db.connect()).resolves.toBeUndefined();
        await expect(() => db.disconnect()).resolves.toBeUndefined();
    });
});
