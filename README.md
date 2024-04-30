# Modelos, métodos e técnicas da engenharia de software - Projeto A3 (Eco 3D)

Projeto A3 da UNA - SI/ADS. Nosso trabalho, intitulado Eco 3D, visa desenvolver um sistema de gerenciamento de estoque para materiais de impressão 3D recicláveis. 

## Integrantes
- [Guilherme Guimarães Nascimento](https://github.com/guilhermeguimaraesn) - 62122082;
- [Luiz Otávio Diniz Carvalho](https://github.com/luizottavioc) – 62116468;
- [Marcelly Ferreira Dias Pinto](https://github.com/marcellydias) – 622220718;
- [Renan Natalino de Sousa](https://github.com/Renansousa27) – 62122847;
- [Samuel Tranquero Marques](https://github.com/ ) - 622121847;
- [Yago Henrique](https://github.com/yagohpt11221) – 62122069;

## Tema
O Eco 3D é um sistema de gerenciamento de estoque voltado para materiais produzidos por impressão 3D a partir de materiais recicláveis. Este projeto visa facilitar o controle e organização dos materiais utilizados na impressão 3D, permitindo aos usuários gerenciar o estoque de forma eficiente. Com o Eco 3D, os usuários poderão cadastrar novos materiais, atualizar informações, visualizar o status do estoque e registrar movimentações, como entradas e saídas de materiais. Além disso, o sistema oferecerá funcionalidades de relatórios para análise de consumo, facilitando o planejamento e a tomada de decisões estratégicas relacionadas ao estoque de materiais recicláveis utilizados na impressão 3D.

## Divisão SCRUM da Equipe
- *Scrum Master:* Renan Natalino de Sousa;
- *Product Owner:* Luiz Otávio Diniz Carvalho;
- *UI/UX:* Marcelly Ferreira Dias Pinto
- *Desenvolvedores:* Guilherme Guimarães Nascimento, Samuel Tranquero Marques e Yago Henrique.  

Renan será responsável por garantir a correta aplicação do framework Scrum, facilitando as reuniões, removendo obstáculos e promovendo um ambiente de trabalho colaborativo e produtivo para a equipe. Luiz Otávio será o Product Owner e estará encarregado de representar os interesses dos stakeholders, definindo as prioridades do produto, gerenciando o backlog do projeto e garantindo que o produto atenda às necessidades e expectativas dos usuários finais, Marcelly Dias será encarregada do UI/UX, garantindo a usabilidade e a experiência do usuário do produto por meio de pesquisa, prototipagem e testes de usabilidade, já os desenvolvedores Guilherme, Samuel e Yago Henrique serão responsáveis pela implementação das funcionalidades do sistema, seguindo as diretrizes e prioridades definidas pelo Product Owner, e colaborando de forma eficiente para entregar um produto de alta qualidade.

## Documentação
Todas as documentações criadas e utilizadas para elaboração deste projeto poderão ser encontradas na pasta [/docs](./docs/) presente na raíz.

## Tecnologias
Nosso projeto utiliza *NestJS* para o backend e *Next.js* para o frontend. Para acessar os repositórios, clique nos links abaixo:
- [Repositório do Backend (NestJS)](https://github.com/2luizottavioc/mmtes-eco3d-nest)
- [Repositório do Frontend (Next.js)](https://github.com/2luizottavioc/mmtes-eco3d-next)

## Ambiente de Desenvolvimento
Para criar o ambiente de desenvolvimento deste projeto, é necessário seguir os seguintes passos:
- Certifique-se de ter todas as seguintes tecnologias instaladas:
    - [Git](https://git-scm.com/downloads);
    - [Visual Studio Code](https://code.visualstudio.com/download);
    - [Node 20+ e npm](https://nodejs.org/en/download);
    - [Docker](https://docs.docker.com/get-docker/);
    - [Postman (opcional)](https://www.postman.com/downloads/);
    - [DBeaver (opcional)](https://dbeaver.io/download/).
- Clonagem do repositório: 
    - Execute o código ```git clone git@github.com:2luizottavioc/mmtes-eco3d-nest.git``` em sua pasta de preferência;
    - Uma pasta "mmtes-eco3d-nest" será criada, portanto, mova-se até ela com ```cd mmtes-eco3d-nest```;
    - Certifique-se de executar todos os próximos passos dessa sessão dentro da raíz do projeto.
- Dependências e .env
    - Na raíz do projeto, instale as dependências via npm com ```npm install``` ou ```npm i```;
    - Com as dependências instaladas, crie o arquivo de configuração (.env) duplicando o arquivo [.env.example](./.env.example) e o renomeando para ".env" com ```cp .env.example .env``` ou ```copy .\.env.example .\.env```.
- Banco de dados
    - Para iniciar o banco de dados, suba a imagem mysql presente no [docker-compose.yml](./docker-compose.yml) do projeto com ```docker compose up -d```;
    - Verifique se deu tudo certo com a criação da imagem via ```docker ps``` observando seu status;
    - Com a imagem em "status up", crie o schema do banco (migration) a partir do prisma com ```npx prisma migrate dev --name init```;
    - Para verificar se o schema do banco foi iniciado corretamente, crie uma nova conexão pelo DBevear (ou pelo cliente de sua preferência) referenciando ao banco da imagem do docker com as seguintes credenciais:
        - driver: mysql
        - host: localhost
        - port: 3388
        - user: eco3d
        - password: eco3d
- Conexões e endpoints
    - Com o banco conectado e todas as dependências instaladas, verifique se as rotas estão surtindo efeito. Para isso, inicie o modo de desenvolvimento do nest com ```npm run start:dev``` para que seja alocado um servidor com hot-reload para o nosso projeto;
    - Com o modo desenvolvimento ligado, crie uma request para ```localhost:3000/hello-world``` (ou encontre-a pelo [Postman do projeto](https://www.postman.com/galactic-escape-194171/workspace/global/request/34484930-631be1ce-6ed6-450f-aef7-9483c209135b?action=share&creator=34484930&ctx=documentation)) e verifique se a string "Hello World!" apareceu em sua resposta;
    - Caso todos os passos tenham sido concluídos com sucesso, o projeto já está idealmente preparado para o desenvolvimento.
