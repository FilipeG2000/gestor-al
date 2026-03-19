# Gestor de Alojamento Local (gestor-al)

Sistema de gestão para **Alojamentos Locais (AL)** desenvolvido como projeto **full-stack**.

Este projeto simula um sistema real utilizado por gestores de propriedades e pequenas unidades turísticas.

Foi desenvolvido como parte do meu **portefólio técnico**, com foco em:

* Desenvolvimento **Backend com Java e Spring Boot**
* Construção de **APIs REST**
* Modelação de dados e regras de negócio
* Integração **Frontend React + Backend**
* Estruturação de um projeto **Fullstack moderno**

---

# Arquitetura do Projeto

O projeto está organizado como um **monorepo fullstack**, contendo duas aplicações separadas.

```
gestor-al
│
├── backend
│   └── API REST em Spring Boot
│
├── frontend
│   └── Interface Web em React + TypeScript
│
└── README.md
```

## Backend

Responsável por:

* Gestão de propriedades
* Gestão de reservas
* Gestão de bloqueios de datas
* Verificação de disponibilidade
* Regras de negócio
* Persistência em base de dados

## Frontend

Responsável por:

* Interface do utilizador
* Consumo da API
* Visualização e gestão de propriedades e reservas

---

# Funcionalidades atuais

## Propriedades

* Criar propriedades
* Listar propriedades
* Atualizar propriedades
* Apagar propriedades

## Reservas

* Criar reservas
* Listar reservas por propriedade
* Validação automática de conflitos de datas
* Estados de reserva:

  * `CONFIRMED`
  * `CANCELLED`

## Bloqueios de datas

* Criar bloqueios manuais
* Impedir reservas em períodos indisponíveis

## Verificação de disponibilidade

Sistema automático que valida se um período está disponível considerando:

* Reservas existentes
* Bloqueios manuais

---

# Estado atual do frontend

O frontend já está parcialmente funcional e integrado com o backend.

Atualmente já permite:

* Listar propriedades a partir da API (`GET /api/properties`)
* Criar novas propriedades (`POST /api/properties`)
* Atualizar automaticamente a interface após criação
* Navegação entre páginas (React Router)

Funcionalidades em desenvolvimento:

* Gestão de reservas no frontend
* Verificação de disponibilidade com UI
* Edição e remoção de propriedades
* Interface mais avançada (dashboard e calendário)

---

# Stack Tecnológica

## Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Spring Security
* PostgreSQL
* Flyway (Database migrations)
* Swagger / OpenAPI
* Maven
* Docker

## Frontend

* React
* TypeScript
* Vite
* Fetch API
* CSS
* React Router

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/FilipeG2000/gestor-al.git
cd gestor-al
```

---

# Backend

## 2. Subir a base de dados

```bash
cd backend
docker compose up -d
```

---

## 3. Arrancar a API

Linux / Mac

```bash
./mvnw spring-boot:run
```

Windows

```bash
mvnw.cmd spring-boot:run
```

A API ficará disponível em:

```
http://localhost:8080
```

---

# Documentação da API

Swagger UI:

```
http://localhost:8080/swagger-ui/index.html
```

Health check:

```
http://localhost:8080/api/health
```

---

# Frontend

## 4. Instalar dependências

```bash
cd frontend
npm install
```

---

## 5. Arrancar frontend

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```

---

# Comunicação com o Backend

O frontend comunica com o backend através da API:

```
http://localhost:8080/api
```

Exemplo:

```
GET /api/properties
```

---

# Endpoints da API

## Propriedades

```
POST   /api/properties
GET    /api/properties
GET    /api/properties/{id}
PUT    /api/properties/{id}
DELETE /api/properties/{id}
```

---

## Reservas

```
POST /api/bookings
GET  /api/bookings?propertyId=4
```

---

## Bloqueios

```
POST /api/blocks
GET  /api/blocks?propertyId=4
```

---

## Disponibilidade

```
GET /api/availability
```

---

# Estrutura do Backend

```
backend/src/main/java/pt/filipe/gestor_al
 ├── config
 ├── domain/model
 ├── repository
 ├── service
 ├── web/controller
 ├── web/dto
 └── GestorAlApplication.java
```

---

# Estrutura do Frontend

```
frontend/src
│
├── lib
│   └── api.ts
│
├── pages
│   ├── App.tsx
│   ├── PropertiesPage.tsx
│   ├── BookingPage.tsx
│   └── AvailabilityPage.tsx
│
├── types.ts
├── main.tsx
└── index.css
```

---

# Roadmap

* Gestão completa de propriedades (edit/delete)
* Gestão de reservas no frontend
* Calendário visual de ocupação
* Dashboard de métricas
* Sistema de utilizadores
* Autenticação e autorização
* Integração com plataformas externas (Airbnb / Booking)

---

# Objetivo do projeto

Este projeto foi desenvolvido para:

* Consolidar conhecimentos em **Engenharia Informática**
* Demonstrar competências em **desenvolvimento backend**
* Construir uma aplicação **fullstack moderna**
* Simular um sistema real de gestão de reservas
* Servir como base para futuros projetos **SaaS**

---

# Autor

**Filipe Gonçalves**

GitHub
https://github.com/FilipeG2000
