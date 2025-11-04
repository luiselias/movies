// Tipos para a aplicação de filmes

export interface Movie {
	id: number;
	year: number;
	title: string;
	studios: string;
	producers: string;
	winner: boolean;
}

export interface WinnersYearRange {
	min: {
		producer: string;
		interval: number;
		previousWin: number;
		followingWin: number;
	}[];
	max: {
		producer: string;
		interval: number;
		previousWin: number;
		followingWin: number;
	}[];
}

export interface WinnersYearRangeDB {
	producer: string;
	interval: number;
	firstWin: number;
	nextWin: number;
}
