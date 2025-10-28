import app from './src/app.js';

const PORT = process.env.PORT || 8901;

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
}

export default app;