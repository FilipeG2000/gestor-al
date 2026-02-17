# Gestor de Alojamento Local (gestor-al)

Sistema de gestão para alojamentos locais desenvolvido em **Java com Spring Boot**.
Este projeto faz parte do meu portefólio para demonstrar competências em desenvolvimento backend, modelação de dados e regras de negócio.

---

## Funcionalidades atuais

* CRUD de propriedades (Alojamentos)
* API REST com Spring Boot
* Documentação automática com Swagger
* Persistência em PostgreSQL
* Migrations de base de dados com Flyway
* Docker para base de dados

---

## Stack tecnológica

* Java 17
* Spring Boot
* Spring Data JPA
* Spring Security
* PostgreSQL
* Flyway
* Docker
* Maven
* Swagger (Springdoc OpenAPI)

---

## Como correr o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/FilipeG2000/gestor-al.git
cd gestor-al
```

### 2. Subir a base de dados com Docker

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

Health check:

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
 │         └── Property.java
 │
 ├── repository
 │    └── PropertyRepository.java
 │
 ├── service
 │    └── PropertyService.java
 │
 ├── web
 │    ├── controller
 │    │     └── PropertyController.java
 │    │
 │    ├── dto
 │    │     ├── PropertyCreateRequest.java
 │    │     ├── PropertyResponse.java
 │    │     └── PropertyUpdateRequest.java
 │    │
 │    └── HealthController.java
 │
 └── GestorAlApplication.java
```

---

## Roadmap (próximas funcionalidades)

* Sistema de reservas (Bookings)
* Bloqueios de datas
* Gestão de tarefas de limpeza
* Dashboard com métricas
* Autenticação de utilizadores
* Integração com plataformas (Airbnb/Booking)

---

## Objetivo do projeto

Este projeto foi criado para:

* Consolidar conhecimentos em **Engenharia Informática**
* Demonstrar competências em **desenvolvimento backend**
* Servir como base para evolução durante o mestrado em **Gestão**

---

## Autor

**Filipe Gonçalves**
GitHub: [https://github.com/FilipeG2000](https://github.com/FilipeG2000)
