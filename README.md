# Divulgar Trabalhos

**Serviços da sua região**

O **Divulgar Trabalhos** é uma aplicação web que tem como objetivo aproximar clientes e profissionais autônomos, facilitando a divulgação de serviços e a busca por prestadores de serviços por categoria e localização.

O projeto possui uma interface desenvolvida com Vue.js e uma API em Node.js responsável por operações como cadastro, login, consulta de profissionais e agendamentos.

## Funcionalidades

- Visualização da página inicial e de profissionais divulgados.
- Navegação por categorias de serviços:
  - Construção
  - Beleza
  - Serviços Gerais
  - Tecnologia
  - Fotografia
  - Eventos
- Pesquisa e filtros para localizar profissionais.
- Consulta de profissionais próximos, considerando localização e raio de busca.
- Visualização de perfil profissional.
- Cadastro de contas dos tipos cliente e empreendedor.
- Login de usuários.
- Cadastro de perfil profissional.
- Solicitação e consulta de agendamentos.

> Algumas funcionalidades dependem da execução do backend e da configuração do banco de dados. A disponibilidade de dados também depende dos registros cadastrados.

## Tecnologias

### Frontend
- [Vue 3](https://vuejs.org/) — construção da interface.
- [Vue Router](https://router.vuejs.org/) — navegação entre páginas.
- [Vite](https://vite.dev/) — ambiente de desenvolvimento e build.
- [Tailwind CSS 4](https://tailwindcss.com/) — estilização.
- JavaScript, HTML5 e CSS3.

### Backend
- [Node.js](https://nodejs.org/) — ambiente de execução.
- [Express](https://expressjs.com/) — criação da API REST.
- [Sequelize](https://sequelize.org/) — mapeamento objeto-relacional.
- [MySQL](https://www.mysql.com/) — banco de dados.
- `mysql2` — driver de conexão com MySQL.
- `dotenv` — gerenciamento de variáveis de ambiente.
- `cors` — configuração de compartilhamento de recursos entre origens.

## Estrutura do repositório

A estrutura principal está organizada da seguinte forma:

```text
Divulgar_Trabalhos_Corrigido/
├── backend/
│   ├── data/
│   ├── database/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
└── divulgar-trabalhos/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── router/
    │   ├── utils/
    │   └── views/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Pré-requisitos

- Node.js **22.12.0 ou superior**.
- npm.
- MySQL em execução e um banco de dados criado para a aplicação.

## Como executar

Os comandos abaixo consideram que o terminal está na pasta raiz do repositório, onde estão as pastas `backend` e `divulgar-trabalhos`.

### 1. Configurar o backend

Entre na pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`, com as configurações da sua instalação do MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nome_do_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

Substitua os valores de exemplo pelos dados do seu ambiente. O banco informado em `DB_NAME` precisa existir antes de iniciar a API.

Inicie o servidor:

```bash
node server.js
```

Por padrão, a API ficará disponível em `http://localhost:3000`. Para verificar se está funcionando, acesse:

```text
http://localhost:3000/api/health
```

A resposta esperada contém o status `ok` e uma mensagem indicando que a API está funcionando.

### 2. Configurar o frontend

Em outro terminal, a partir da raiz do repositório, execute:

```bash
cd divulgar-trabalhos
npm install
```

### 3. Iniciar a aplicação

Ainda na pasta `divulgar-trabalhos`, execute:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

Mantenha o backend e o frontend em execução enquanto utilizar as funcionalidades que dependem da API.

## Scripts disponíveis

Na pasta `divulgar-trabalhos`:

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção na pasta `dist`. |
| `npm run preview` | Executa uma prévia local da versão compilada. |

## API

O backend disponibiliza rotas organizadas por recurso:

| Recurso | Prefixo |
|---|---|
| Verificação da API | `GET /api/health` |
| CEP | `/api/cep` |
| Localização | `/api/localizacao` |
| Geocodificação | `/api/geocodificacao` |
| Endereços | `/api/endereco` |
| Profissionais | `/api/profissionais` |
| Usuários | `/api/usuarios` |
| Agendamentos | `/api/agendamentos` |

A busca por profissionais próximos utiliza o endpoint:

```http
GET /api/profissionais/proximos
```

Entre os parâmetros de consulta estão `latitude`, `longitude`, `raio`, `profissao`, `categoria` e `busca`.

O frontend possui configuração do Vite para encaminhar requisições iniciadas por `/api` ao backend em `http://localhost:3000`.

## Observações

- O backend precisa estar conectado a um banco MySQL válido para executar as operações que persistem dados.
- Não compartilhe o arquivo `.env` nem publique senhas ou credenciais.
- A pasta `node_modules` e os arquivos gerados em `dist` não precisam ser versionados.
- Para publicar o frontend em hospedagem, configure o servidor para encaminhar rotas da aplicação Vue Router para `index.html`.
- A execução local não significa que a aplicação já esteja publicada na internet.

## Objetivo acadêmico

O projeto reúne práticas de desenvolvimento frontend e backend, criação de APIs REST, integração com banco de dados, organização de rotas, geolocalização e desenvolvimento de interfaces web.

---

Desenvolvido como projeto acadêmico.
