import request from 'supertest';
import app, {closeServer} from '../index';

describe('Aplicação de filmes', () => {
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
		closeServer();
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

	it('deve retornar a lista de filmes ganhadores por ano', async () => {
		const response = await request(app).get('/api/v1/movies/winners');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			count: 0,
			data: [],
			success: true
		});
	});

	it('deve retornar a lista de filmes ganhadores em intervalo de máximo e minímo', async () => {
		const response = await request(app).get('/api/v1/movies/winners/range');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			"min": [
				{
					"producer": "Producer 1",
					"interval": 1,
					"previousWin": 2008,
					"followingWin": 2009
				},
				{
					"producer": "Producer 2",
					"interval": 1,
					"previousWin": 2018,
					"followingWin": 2019
				}
			],
			"max": [
				{
					"producer": "Producer 1",
					"interval": 99,
					"previousWin": 1900,
					"followingWin": 1999
				},
				{
					"producer": "Producer 2",
					"interval": 99,
					"previousWin": 2000,
					"followingWin": 2099
				}
			]
		});
	});

	it('deve retornar o error 404 se acessar uma rota inexistente', async () => {
		const response = await request(app).get('/api/v1/movies/unknown-route');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			success: false,
			path: '/api/v1/movies/unknown-route',
			message: 'Rota não encontrada'
		});
	});
});
