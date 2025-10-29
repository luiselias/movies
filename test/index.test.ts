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
	it('deve retornar a lista de filmes', async () => {
		const response = await request(app).get('/api/v1/movies');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			count: 0,
			data: [],
			success: true
		});
	});
});
