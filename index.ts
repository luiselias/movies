import app from './src/app.js';

const PORT = process.env.PORT || 8901;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export const closeServer = () => {
  server.close();
};

export default app;
