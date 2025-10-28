import request from 'supertest';
import app from '../index';

describe('Aplicação', () => {
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
	it('deve retornar resposta da rota raiz', async () => {
		const response = await request(app).get('/');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Servidor inicializado!'
		});
	});
});
