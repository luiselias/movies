jest.mock('../../../src/infra/database/movies');

import MovieDatabase from '../../../src/infra/database/movies';
import MoviesService from '../../../src/service/movies/index.js';

describe('Módulo de serviço do movies', () => {
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

    it('deve retornar uma lista vazia de filmes', async () => {
        jest.spyOn(MovieDatabase.prototype, 'getAllMovies').mockResolvedValueOnce([]);

        const service = new MoviesService();

        const movies = await service.getAllMovies()
        expect(movies).toEqual([]);
    });

    it('deve retornar apenas um ganhador no intervalo entre as premiações', async () => {
        jest.spyOn(MovieDatabase.prototype, 'getWinnersYear').mockResolvedValueOnce([
            {
                id: 1,
                year: 2000,
                title: 'Movie 1',
                studios: 'Studio 1',
                producers: 'Producer 1',
                winner: true,
            },
            {
                id: 2,
                year: 2005,
                title: 'Movie 2',
                studios: 'Studio 10',
                producers: 'Producer 1',
                winner: true,
            },
        ]);
        const service = new MoviesService();

        const range = await service.getWinnersYearRange();
        expect(range).toEqual({
            max: [
                {
                    followingWin: 2005,
                    interval: 5,
                    previousWin: 2000,
                    producer: 'Producer 1',
                },
            ],
            min: [
                {
                    followingWin: 2005,
                    interval: 5,
                    previousWin: 2000,
                    producer: 'Producer 1',
                },
            ]
        });
    });

    it('não deve retornar apenas um ganhador no intervalo entre as premiações se não for duas vezes o mesmo produtor', async () => {
        jest.spyOn(MovieDatabase.prototype, 'getWinnersYear').mockResolvedValueOnce([
            {
                id: 1,
                year: 2000,
                title: 'Movie 1',
                studios: 'Studio 1',
                producers: 'Producer 1',
                winner: true,
            },
            {
                id: 2,
                year: 2005,
                title: 'Movie 2',
                studios: 'Studio 10',
                producers: 'Producer 2',
                winner: true,
            },
        ]);
        const service = new MoviesService();

        const range = await service.getWinnersYearRange();
        expect(range).toEqual({
            max: [],
            min: [],
        });
    });

    it('deve retornar dois ganhadores no intervalo entre as premiações', async () => {
        jest.spyOn(MovieDatabase.prototype, 'getWinnersYear').mockResolvedValueOnce([
            {
                id: 1,
                year: 2000,
                title: 'Movie 1',
                studios: 'Studio 1',
                producers: 'Producer 1',
                winner: true,
            },
            {
                id: 2,
                year: 2005,
                title: 'Movie 2',
                studios: 'Studio 10',
                producers: 'Producer 1',
                winner: true,
            },
            {
                id: 3,
                year: 2001,
                title: 'Movie A',
                studios: 'Studio 1',
                producers: 'Producer 2',
                winner: true,
            },
            {
                id: 4,
                year: 2006,
                title: 'Movie B',
                studios: 'Studio 10',
                producers: 'Producer 2',
                winner: true,
            },
        ]);
        const service = new MoviesService();

        const range = await service.getWinnersYearRange();
        expect(range).toEqual({
            max: [
                {
                    followingWin: 2006,
                    interval: 5,
                    previousWin: 2001,
                    producer: 'Producer 2',
                },
            ],
            min: [
                {
                    followingWin: 2005,
                    interval: 5,
                    previousWin: 2000,
                    producer: 'Producer 1',
                },
            ]
        });
    });

    it('deve retornar três ganhadores no intervalo entre as premiações', async () => {
        jest.spyOn(MovieDatabase.prototype, 'getWinnersYear').mockResolvedValueOnce([
            {
                id: 1,
                year: 2000,
                title: 'Movie 1',
                studios: 'Studio 1',
                producers: 'Producer 1',
                winner: true,
            },
            {
                id: 2,
                year: 2005,
                title: 'Movie 2',
                studios: 'Studio 10',
                producers: 'Producer 1',
                winner: true,
            },
            {
                id: 5,
                year: 2000,
                title: 'Movie EE',
                studios: 'Studio 1',
                producers: 'Producer 3',
                winner: true,
            },
            {
                id: 6,
                year: 2010,
                title: 'Movie FF',
                studios: 'Studio 10',
                producers: 'Producer 3',
                winner: true,
            },
            {
                id: 3,
                year: 2001,
                title: 'Movie A',
                studios: 'Studio 1',
                producers: 'Producer 2',
                winner: true,
            },
            {
                id: 4,
                year: 2006,
                title: 'Movie B',
                studios: 'Studio 10',
                producers: 'Producer 2',
                winner: true,
            },
        ]);
        const service = new MoviesService();

        const range = await service.getWinnersYearRange();
        expect(range).toEqual({
            max: [
                {
                    followingWin: 2010,
                    interval: 10,
                    previousWin: 2000,
                    producer: 'Producer 3',
                },
            ],
            min: [
                {
                    followingWin: 2005,
                    interval: 5,
                    previousWin: 2000,
                    producer: 'Producer 1',
                },
                {
                    followingWin: 2006,
                    interval: 5,
                    previousWin: 2001,
                    producer: 'Producer 2',
                },
            ],
        });
    });
});
