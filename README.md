# Gestor de Alojamento Local (gestor-al)

Sistema de gestão para **Alojamentos Locais (AL)** desenvolvido como projeto **full-stack**.

Este projeto simula um sistema real de gestão de propriedades e reservas, semelhante aos utilizados por gestores de alojamento local e pequenas unidades turísticas.

Foi desenvolvido como parte do meu **portefólio técnico**, com foco em:

- Desenvolvimento **Backend com Java e Spring Boot**
- Construção de **APIs REST**
- Modelação de dados e regras de negócio
- Integração **Frontend React + Backend**
- Estruturação de um projeto **Fullstack moderno**

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

- Gestão de propriedades
- Gestão de reservas
- Gestão de bloqueios de datas
- Verificação de disponibilidade
- Regras de negócio
- Persistência em base de dados

## Frontend

Responsável por:

- Interface do utilizador
- Consumo da API
- Visualização e gestão de propriedades e reservas

---

# Funcionalidades atuais

## Propriedades
- Criar propriedades
- Listar propriedades
- Atualizar propriedades
- Apagar propriedades

## Reservas
- Criar reservas
- Listar reservas por propriedade
- Validação automática de conflitos de datas
- Estados de reserva:
  - `CONFIRMED`
  - `CANCELLED`

## Bloqueios de datas
- Criar bloqueios manuais
- Impedir reservas em períodos indisponíveis

## Verificação de disponibilidade
Sistema automático que valida se um período está disponível considerando:

- Reservas existentes
- Bloqueios manuais

---

# Stack Tecnológica

## Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- PostgreSQL
- Flyway (Database migrations)
- Swagger / OpenAPI
- Maven
- Docker

## Frontend
- React
- TypeScript
- Vite
- Fetch API
- CSS

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

Dentro da pasta backend:

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

# Endpoints da API

## Propriedades

### Criar propriedade
```
POST /api/properties
```

### Listar propriedades
```
GET /api/properties
```

### Obter propriedade por ID
```
GET /api/properties/{id}
```

### Atualizar propriedade
```
PUT /api/properties/{id}
```

### Apagar propriedade
```
DELETE /api/properties/{id}
```

---

# Reservas

### Criar reserva
```
POST /api/bookings
```

Exemplo:

```json
{
  "propertyId": 4,
  "guestName": "João Silva",
  "guestsCount": 2,
  "checkIn": "2026-03-01",
  "checkOut": "2026-03-05"
}
```

O sistema valida automaticamente:

- datas válidas
- conflitos com outras reservas
- conflitos com bloqueios

### Listar reservas por propriedade
```
GET /api/bookings?propertyId=4
```

---

# Bloqueios

### Criar bloqueio
```
POST /api/blocks
```

Exemplo:

```json
{
  "propertyId": 4,
  "reason": "Manutenção",
  "startDate": "2026-03-10",
  "endDate": "2026-03-12"
}
```

### Listar bloqueios
```
GET /api/blocks?propertyId=4
```

---

# Disponibilidade

### Verificar disponibilidade
```
GET /api/availability
```

Exemplo:

```
/api/availability?propertyId=4&from=2026-03-01&to=2026-03-05
```

Resposta:

```json
{
  "propertyId": 4,
  "from": "2026-03-01",
  "to": "2026-03-05",
  "available": false,
  "reason": "BOOKING_CONFLICT"
}
```

Possíveis resultados:

| Reason | Significado |
|------|------|
| AVAILABLE | Intervalo disponível |
| BOOKING_CONFLICT | Conflito com reserva |
| BLOCK_CONFLICT | Conflito com bloqueio |
| INVALID_RANGE | Intervalo inválido |

---

# Estrutura do Backend

```
backend/src/main/java/pt/filipe/gestor_al
 ├── config
 │    └── SecurityConfig.java
 │
 ├── domain
 │    └── model
 │         ├── Property.java
 │         ├── Booking.java
 │         ├── BookingStatus.java
 │         └── Block.java
 │
 ├── repository
 │    ├── PropertyRepository.java
 │    ├── BookingRepository.java
 │    └── BlockRepository.java
 │
 ├── service
 │    ├── PropertyService.java
 │    ├── BookingService.java
 │    ├── BlockService.java
 │    └── AvailabilityService.java
 │
 ├── web
 │    ├── controller
 │    │     ├── PropertyController.java
 │    │     ├── BookingController.java
 │    │     ├── BlockController.java
 │    │     └── AvailabilityController.java
 │    │
 │    ├── dto
 │    │     ├── property
 │    │     ├── booking
 │    │     ├── block
 │    │     └── availability
 │    │
 │    └── HealthController.java
 │
 └── GestorAlApplication.java
```

---

# Frontend

A aplicação frontend está localizada na pasta:

```
frontend/
```

O frontend foi desenvolvido com **React + TypeScript** e comunica diretamente com a API backend.

Tecnologias utilizadas:

- React
- TypeScript
- Vite
- Fetch API
- CSS

---

# Como correr o frontend

Ir para a pasta frontend:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

Arrancar aplicação:

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

Exemplo de chamada:

```
GET /api/properties
```

Esta chamada retorna a lista de propriedades registadas no sistema.

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
│
├── main.tsx
└── index.css
```

## Descrição

**api.ts**

Contém funções responsáveis por comunicar com a API backend.

**PropertiesPage**

Página responsável por listar propriedades.

**BookingPage**

Página para criação de reservas.

**AvailabilityPage**

Página para verificação de disponibilidade.

**types.ts**

Define os tipos TypeScript utilizados na aplicação.

---

# Estado atual do frontend

O frontend encontra-se em fase inicial e irá evoluir progressivamente para incluir:

- criação de propriedades
- gestão de reservas
- calendário visual de disponibilidade
- dashboard de ocupação

---

# Roadmap (próximas funcionalidades)

- Dashboard de ocupação
- Gestão de tarefas de limpeza
- Sistema de utilizadores
- Autenticação e autorização
- Multi-propriedade
- Calendário visual de reservas
- Integração com plataformas externas (Airbnb / Booking)

---

# Objetivo do projeto

Este projeto foi desenvolvido para:

- Consolidar conhecimentos em **Engenharia Informática**
- Demonstrar competências em **desenvolvimento backend**
- Construir uma aplicação **fullstack moderna**
- Simular um sistema real de gestão de reservas
- Servir como base para futuros projetos **SaaS**

---

# Autor

**Filipe Gonçalves**

GitHub  
https://github.com/FilipeG2000