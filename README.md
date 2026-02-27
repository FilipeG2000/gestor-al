# Gestor de Alojamento Local (gestor-al)

Sistema de gestão para alojamentos locais desenvolvido em **Java com Spring Boot**.  
Este projeto faz parte do meu portefólio para demonstrar competências em desenvolvimento backend, modelação de dados e implementação de regras de negócio reais.

---

## Funcionalidades atuais

### Propriedades
- CRUD de propriedades (Alojamentos)

### Reservas
- Criação de reservas
- Validação de conflitos de datas
- Estados de reserva (CONFIRMED / CANCELLED)

### Bloqueios
- Bloqueio manual de datas
- Impede criação de reservas em períodos indisponíveis

### Infraestrutura
- API REST com Spring Boot
- Documentação automática com Swagger
- Persistência em PostgreSQL
- Migrations com Flyway
- Base de dados em Docker

---

## Stack tecnológica

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- PostgreSQL
- Flyway
- Docker
- Maven
- Swagger (Springdoc OpenAPI)

---

## Como correr o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/FilipeG2000/gestor-al.git
cd gestor-al
```

### 2. Subir a base de dados

```bash
docker compose up -d
```

### 3. Arrancar a aplicação

Linux/Mac:

```bash
./mvnw spring-boot:run
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

---

## Aceder à API

Swagger UI:

```
http://localhost:8080/swagger-ui/index.html
```

Health Check:

```
http://localhost:8080/api/health
```

---

## Estrutura do projeto

```
src/main/java/pt/filipe/gestor_al
 ├── config
 │    └── SecurityConfig.java
 │
 ├── domain
 │    └── model
 │         ├── Property.java
 │         ├── Booking.java
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
 │    └── BlockService.java
 │
 ├── web
 │    ├── controller
 │    │     ├── PropertyController.java
 │    │     ├── BookingController.java
 │    │     └── BlockController.java
 │    │
 │    ├── dto
 │    │     ├── property
 │    │     ├── booking
 │    │     └── block
 │    │
 │    └── HealthController.java
 │
 └── GestorAlApplication.java
```

---

## Roadmap (próximas funcionalidades)

- Verificação de disponibilidade automática
- Dashboard de ocupação
- Gestão de tarefas de limpeza
- Autenticação de utilizadores
- Multi-propriedade
- Integração com plataformas externas (Airbnb / Booking)

---

## Objetivo do projeto

Este projeto foi criado para:

- Consolidar conhecimentos em Engenharia Informática
- Demonstrar competências em backend real-world
- Implementar lógica de negócio típica de sistemas de reservas
- Evoluir como base para produtos SaaS futuros

---

## Autor

**Filipe Gonçalves**  
GitHub: https://github.com/FilipeG2000