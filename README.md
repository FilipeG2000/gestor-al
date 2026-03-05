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

### Disponibilidade
- Verificação automática de disponibilidade
- Considera:
  - Reservas existentes
  - Bloqueios manuais

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

# Endpoints da API

## Propriedades

### Criar propriedade
```
POST /api/properties
```
Cria um novo alojamento.

### Listar propriedades
```
GET /api/properties
```
Retorna todas as propriedades.

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

## Reservas

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

Valida automaticamente:
- Datas válidas
- Conflitos com outras reservas
- Conflitos com bloqueios

---

### Listar reservas por propriedade
```
GET /api/bookings?propertyId=4
```

---

## Bloqueios

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

Impede reservas nesse período.

---

### Listar bloqueios
```
GET /api/blocks?propertyId=4
```

---

## Disponibilidade

### Verificar disponibilidade
```
GET /api/availability?propertyId=4&from=2026-03-01&to=2026-03-05
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

Possíveis razões:

| Reason | Significado |
|--------|------------|
| AVAILABLE | Intervalo livre |
| BOOKING_CONFLICT | Sobreposição com reserva |
| BLOCK_CONFLICT | Sobreposição com bloqueio |
| INVALID_RANGE | Datas inválidas |

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

## Roadmap (próximas funcionalidades)

- Dashboard de ocupação
- Gestão de tarefas de limpeza
- Autenticação de utilizadores
- Multi-propriedade
- Integração com plataformas externas (Airbnb / Booking)
- Frontend em React

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