<h1 align="center"> 💰 Coins Master 💰 </h1>

API para o projeto Coins Master (desenvolvido para a disciplina de Programação para Dispositivos Móveis na FATEC de São José dos Campos)
- Abaixo é possível observar o modelo de dados em que o projeto foi baseado, onde existem  4 tabelas: equipes, usuários, avaliações e feedbacks.
  
<div align="center">

![Modelo de Dados](https://user-images.githubusercontent.com/69374340/202428848-faf66d88-2fbd-45a8-b739-d9795643680d.png)
</div>

### :hammer_and_wrench: Tecnologias e ferramentas
- TypeScript, NodeJS, Express, PostgreSQL, Docker, Insomnia


## :gear: Como rodar
Antes de começar, você vai precisar ter instalado o Node.js e o Yarn (confira um tutorial
[aqui](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535)),
e para clonar esse repositório o [Git](https://git-scm.com/) também!

```bash
# Clone esse repositório
$ git clone https://github.com/MariaGabrielaReis/coins-master-api.git

# Instale as dependências do projeto, assim como suas tipagens
$ yarn

# Execute a aplicação
$ yarn dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

> Use o Insomnia ou Postman, por exemplo, para simular requisições e respostas das rotas

## :railway_track: Rotas
<details>
 <summary>Endpoints disponíveis para gerenciamento de <b>Equipes</b></summary>
 <br>

|                                                                    Tipo | Situação          | Caminho        |
| ----------------------------------------------------------------------: | :---------------- | :------------- |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Listar equipes    | `/teams`       |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | Criar equipe      | `/teams`       |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Visualizar equipe | `/teams/:code` |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | Atualizar equipe  | `/teams/:code` |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | Excluir equipe    | `/teams/:code` |

</details>

<details>
 <summary>Endpoints disponíveis para gerenciamento de <b>Usuários</b></summary>
 <br>

|                                                                    Tipo | Situação           |   Caminho    |
| ----------------------------------------------------------------------: | :----------------- | :----------: |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Listar usuários    |   `/users`   |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | Criar usuário      |   `/users`   |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Visualizar usuário | `/users/:id` |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | Atualizar usuário  | `/users/:id` |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | Excluir usuário    | `/users/:id` |

</details>

<details>
 <summary>Endpoints disponíveis para gerenciamento de <b>Avaliações</b></summary>
 <br>

|                                                                  Tipo | Situação             | Caminho               |
| --------------------------------------------------------------------: | :------------------- | :-------------------- |
| [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | Criar avaliação      | `/avaliation`         |
|  [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Visualizar avaliação | `/avaliation/:userId` |

</details>

## ⚠️ Estrutura de pastas

```
📂 coins-master-api
|- 📁 src
|--- 📁 app
|----- 📁 controllers
|----- 📁 repositories
|--- 📁 database
|--- 📄 index.ts
|--- 📄 routes.ts
|- 📄 .editorconfig
|- 📄 .eslintrc.json
|- 📄 .gitignore
|- 📄 package.json
|- 📄 tsconfig.json
|- 📄 yarn.lock
```

[![image](https://img.shields.io/badge/✨%20Maria%20Gabriela%20Reis,%202022-LinkedIn-009973?style=flat-square)](https://www.linkedin.com/in/mariagabrielareis/)
