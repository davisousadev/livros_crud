# Minha Biblioteca (livros_crud)

Projeto simples para gerenciar a minha biblioteca pessoal — os livros que eu leio. Criei este projeto para aprender a usar Flask no backend e Docker (com Docker Compose) para orquestrar o ambiente, além de um frontend em React/Vite.

## Tecnologias

- Backend: Flask (Python)
- Frontend: React + Vite
- Containers: Docker, Docker Compose

## Executando com Docker Compose

Pré-requisitos: Docker e Docker Compose instalados na sua máquina.

No diretório do projeto, rode:

```bash
# rodar em primeiro plano (útil para desenvolvimento)
docker compose up --build

# ou rodar em background
docker compose up -d --build
```

Isso vai construir e iniciar dois serviços:

- Frontend: http://localhost:5173
- Backend (API): http://localhost:5000

Para parar e remover os containers, redes e volumes criados (quando estiver em background):

```bash
docker compose down
```

## Observações

- As configurações de porta e volumes estão definidas em `docker-compose.yaml`.
- Se alterar dependências do backend ou do frontend, reexecute `docker compose up --build`.

---
