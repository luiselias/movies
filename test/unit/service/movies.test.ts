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

    it('deve retornar as opções vazias se houver apenas um ganhador no intervalo', async () => {
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
            max: [],
            min: []
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

    it('não deve retornar dois ganhadores no intervalo entre as premiações, mas apenas uma vez cada 1', async () => {
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
            max: [],
            min: [],
        });
    });

    it('não deve retornar se for apenas três ganhadores no intervalo entre as premiações', async () => {
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
            max: [],
            min: [],
        });
    });

    it('deve retornar vários ganhadores no intervalo entre as premiações', async () => {
        jest.spyOn(MovieDatabase.prototype, 'getWinnersYearRange').mockResolvedValueOnce([
            {
                producer: 'Producer 1',
                interval: 5,
                firstWin: 2000,
                nextWin: 2005,
            },
            {
                producer: 'Producer 2',
                interval: 5,
                firstWin: 2001,
                nextWin: 2006,
            },
            {
                producer: 'Producer 3',
                interval: 10,
                firstWin: 2000,
                nextWin: 2010,
            },
            {
                producer: 'Producer 4',
                interval: 20,
                firstWin: 2000,
                nextWin: 2020,
            },
            {
                producer: 'Producer 5',
                interval: 25,
                firstWin: 2000,
                nextWin: 2025,
            },
            {
                producer: 'Producer 6',
                interval: 20,
                firstWin: 2010,
                nextWin: 2030,
            },
            
        ]);
        const service = new MoviesService();

        const range = await service.getWinnersYearRange();
        expect(range).toEqual({
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
            max: [
                {
                    followingWin: 2025,
                    interval: 25,
                    previousWin: 2000,
                    producer: 'Producer 5',
                },
                {
                    followingWin: 2030,
                    interval: 20,
                    previousWin: 2010,
                    producer: 'Producer 6',
                },
            ],
        });
    });
});
