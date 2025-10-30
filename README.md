# Movies App
Um aplicativo simples para gerenciar e explorar filmes.

## Requisitos
Node 18 ou superior

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/luiselias/movies.git
cd movies
```

2. Instale as dependências
```bash
yarn install
```

## Executando o Aplicativo

Modo de desenvolvimento:
```bash
yarn dev
```

Build para produção:
```bash
yarn build
yarn start
```

## Acessado as urls
Via curl

Listar todos os filmes:
```bash
curl "http://localhost:8901/api/v1/movies"
```

Listar filmes vencedores por ano:
```bash
curl "http://localhost:8901/api/v1/movies/winners"
```

Listar produtores que ganharam o prêmios mais de uma vez em um intervalo de anos:
```bash
curl "http://localhost:8901/api/v1/movies/winners/range"
```

Ou acesse via browser os mesmos endereços



