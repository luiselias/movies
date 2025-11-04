import request from 'supertest';
import app, { closeServer } from '../index';

/*
Por se tratar de um teste de integração com um banco de dados em memória, não estou mockando 
as chamadas ao banco de dados na maioria dos testes.
*/

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
		expect(response.body.success).toBe(true);
		expect(response.body.data.length).toBe(490);
	});

	it('deve retornar a lista de filmes ganhadores por ano', async () => {
		const response = await request(app).get('/api/v1/movies/winners');

		expect(response.status).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.length).toBe(100);
	});

	it('deve retornar a lista de filmes ganhadores em intervalo de máximo e minímo', async () => {
		const response = await request(app).get('/api/v1/movies/winners/range');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			min: [
				{
					producer: 'Joel Silver',
					interval: 1,
					previousWin: 1990,
					followingWin: 1991
				},
				{
					producer: 'Bo Derek',
					interval: 6,
					previousWin: 1984,
					followingWin: 1990
				}
			],
			max: [
				{
					producer: 'Buzz Feitshans',
					interval: 9,
					previousWin: 1985,
					followingWin: 1994
				},
				{
					producer: 'Matthew Vaughn',
					interval: 13,
					previousWin: 2002,
					followingWin: 2015
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
