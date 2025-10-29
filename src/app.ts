import 'dotenv/config';
import express from 'express';
import moviesV1Route from './api/v1/movies/route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(moviesV1Route);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: 'Rota não encontrada',
		path: req.originalUrl
	});
});

export default app;
