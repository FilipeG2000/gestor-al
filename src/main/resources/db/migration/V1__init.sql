CREATE TABLE app_user (
                          id BIGSERIAL PRIMARY KEY,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          password_hash VARCHAR(255) NOT NULL,
                          created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE property (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(120) NOT NULL,
                          timezone VARCHAR(64) NOT NULL DEFAULT 'Europe/Lisbon',
                          check_in_time VARCHAR(5) NOT NULL DEFAULT '15:00',
                          check_out_time VARCHAR(5) NOT NULL DEFAULT '11:00',
                          created_at TIMESTAMP NOT NULL DEFAULT now()
);
