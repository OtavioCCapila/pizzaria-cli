# Pizzaria do Tavim

Aplicação de linha de comando (CLI) para uma pizzaria. O cliente pode criar uma conta, entrar, montar uma pizza, fazer pedidos e consultar seus pedidos e dados de conta. A aplicação foi construída com NestJS e persiste os dados em PostgreSQL.

## Funcionalidades

- Cadastro e login de clientes.
- Senhas armazenadas como hash usando `bcrypt`.
- Criação de pedidos com tamanho, sabor e borda escolhidos no catálogo.
- Consulta do histórico de pedidos e dos dados da conta.
- Navegação interativa pelo terminal.

## Tecnologias e bibliotecas

### Aplicação

| Biblioteca | Uso |
| --- | --- |
| [NestJS](https://nestjs.com/) (`@nestjs/common`, `@nestjs/core`) | Estrutura a aplicação em módulos e serviços e fornece injeção de dependências. O processo inicia um contexto Nest sem servidor HTTP. |
| `@nestjs/config` e `dotenv` | Disponibilizam as configurações do ambiente, incluindo as credenciais do banco. |
| `@nestjs/typeorm` e `typeorm` | Integram o NestJS ao ORM, mapeiam entidades para tabelas e executam consultas e migrações. |
| `pg` | Driver de conexão do PostgreSQL usado pelo TypeORM. |
| `@inquirer/prompts` | Cria menus, campos de texto, entradas de senha e confirmações interativas no terminal. |
| `cli-table3` | Formata os dados da conta e os pedidos em tabelas no terminal. |
| `figlet` | Exibe o banner ASCII da aplicação. |
| `ora` | Exibe indicadores de progresso durante operações como cadastro, login e criação de pedido. |
| `bcrypt` | Gera e compara hashes de senha. |
| `reflect-metadata` e `rxjs` | Dependências de suporte usadas pelo ecossistema NestJS. |

### Desenvolvimento e testes

- **TypeScript** (`typescript`, `ts-node`, `ts-loader`): tipagem e execução/compilação do código.
- **Nest CLI** (`@nestjs/cli`, `@nestjs/schematics`): comandos de desenvolvimento e build.
- **Jest**, `ts-jest`, `@nestjs/testing` e **Supertest**: infraestrutura para testes unitários e end-to-end.
- **Oxlint** e **Prettier**: lint e formatação.
- `tsconfig-paths` e `source-map-support`: suporte à execução e depuração.

## Arquitetura

O ponto de entrada em `src/main.ts` cria um contexto de aplicação com `NestFactory.createApplicationContext`, obtém o `CliService`, executa o loop do CLI e fecha o contexto ao sair. Não há servidor HTTP iniciado.

`AppModule` é o módulo raiz: carrega as configurações, configura a conexão TypeORM e agrega os módulos de CLI, usuários, autenticação, catálogo e pedidos. Os módulos organizam responsabilidades e expõem serviços ou repositórios por injeção de dependências.

### Fluxo do CLI

`CliService` controla a navegação por estados (`CliState`) e delega cada tela ao menu correspondente:

1. O menu principal oferece login, cadastro e saída.
2. Após autenticar, o menu do cliente oferece criação de pedido, histórico e dados da conta.
3. Para montar a pizza, a aplicação carrega tamanhos, sabores e bordas do banco, calcula o total a partir dos preços selecionados e salva o pedido após a confirmação.
4. O histórico apresenta os pedidos do cliente com os dados relacionados do catálogo.

### Módulos e persistência

- `src/modules/cli`: loop de navegação, estados, banner e telas do terminal.
- `src/modules/auth`: cadastro, autenticação e sessão em memória. `UserRepository` concentra as operações de persistência de usuários.
- `src/modules/user`: acesso aos usuários e tipos associados.
- `src/modules/pizza`: consulta dos tamanhos, sabores e bordas disponíveis.
- `src/modules/order`: criação e consulta de pedidos, separando serviço e repositório.
- `src/database/entities`: entidades TypeORM de usuários, pedidos e itens do catálogo.
- `src/database/migrations`: criação das tabelas e relacionamentos do banco.

Um pedido referencia um usuário, um tamanho, um sabor e uma borda. A sessão atual é mantida somente em memória; encerrar o processo encerra a sessão. O TypeORM está configurado com `synchronize: false`, portanto o esquema é controlado por migrações.

## Requisitos

- Node.js e npm.
- Docker com Docker Compose, ou uma instância PostgreSQL acessível.

## Configuração e execução

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o PostgreSQL local fornecido pelo projeto:

   ```bash
   docker compose up -d postgres
   ```

3. Crie um arquivo `.env` na raiz do projeto com as configurações lidas por `src/database/database.config.ts`:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=pizzaria_user
   DB_PASSWORD=pizzaria_password
   DB_NAME=pizzaria_db
   ```

   Esses valores correspondem ao serviço PostgreSQL definido em `docker-compose.yml`. Se usar outro banco ou credenciais, ajuste as variáveis conforme necessário.

4. Crie as tabelas e relacionamentos:

   ```bash
   npm run migration:run
   ```

5. Cadastre opções nas tabelas `pizza_size`, `pizza_topping` e `pizza_border`. As migrações criam essas tabelas, mas não inserem dados de catálogo; elas precisam ter registros para que o fluxo de criação de pedido apresente opções.

6. Inicie a aplicação:

   ```bash
   npm run start:dev
   ```

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run start` | Inicia a aplicação. |
| `npm run start:dev` | Inicia em modo de desenvolvimento com watch. |
| `npm run start:debug` | Inicia em modo de desenvolvimento com depuração. |
| `npm run start:prod` | Executa a versão compilada em `dist/`. |
| `npm run build` | Compila o projeto. |
| `npm run format` | Formata os arquivos TypeScript de `src/` e `test/`. |
| `npm run lint` | Executa o Oxlint em `src/` e `test/`. |
| `npm test` | Executa os testes Jest. |
| `npm run test:watch` | Executa os testes em modo watch. |
| `npm run test:cov` | Executa os testes com cobertura. |
| `npm run test:e2e` | Executa os testes end-to-end. |
| `npm run migration:run` | Aplica migrações pendentes. |
| `npm run migration:revert` | Reverte a última migração aplicada. |
| `npm run migration:create -- src/database/migrations/NomeDaMigracao` | Cria um arquivo de migração. |
| `npm run migration:generate -- src/database/migrations/NomeDaMigracao` | Gera uma migração a partir das diferenças do modelo e do banco. |

Os comandos de migração usam a configuração de `src/database/data-source.ts` e também dependem das variáveis de banco definidas no `.env`.