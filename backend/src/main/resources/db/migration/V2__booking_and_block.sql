-- BOOKING
CREATE TABLE booking (
                         id BIGSERIAL PRIMARY KEY,
                         property_id BIGINT NOT NULL REFERENCES property(id) ON DELETE CASCADE,

                         guest_name VARCHAR(120) NOT NULL,
                         guests_count INT NOT NULL,

                         check_in DATE NOT NULL,
                         check_out DATE NOT NULL,

                         status VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
                         created_at TIMESTAMP NOT NULL DEFAULT now(),

                         CONSTRAINT booking_dates_valid CHECK (check_in < check_out),
                         CONSTRAINT booking_guests_valid CHECK (guests_count > 0)
);

CREATE INDEX idx_booking_property_dates
    ON booking(property_id, check_in, check_out);

-- BLOCK
CREATE TABLE block (
                       id BIGSERIAL PRIMARY KEY,
                       property_id BIGINT NOT NULL REFERENCES property(id) ON DELETE CASCADE,

                       reason VARCHAR(200),
                       start_date DATE NOT NULL,
                       end_date DATE NOT NULL,

                       created_at TIMESTAMP NOT NULL DEFAULT now(),

                       CONSTRAINT block_dates_valid CHECK (start_date < end_date)
);

CREATE INDEX idx_block_property_dates
    ON block(property_id, start_date, end_date);