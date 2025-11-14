-- Gymple database schema (PostgreSQL)
-- Generated for initial model: memberships, clients, payments

-- =========================================
-- ENUM TYPES
-- =========================================

-- Membership status for a client membership
CREATE TYPE client_membership_status AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED');


-- =========================================
-- PERSON
-- =========================================
CREATE TABLE person (
    person_id   BIGSERIAL,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    phone       VARCHAR(30),
    email       VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE person
    ADD CONSTRAINT pk_person PRIMARY KEY (person_id);

ALTER TABLE person
    ADD CONSTRAINT uq_person_email UNIQUE (email);


-- =========================================
-- ROLE
-- =========================================
CREATE TABLE role (
    role_id     SERIAL,
    name        VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

ALTER TABLE role
    ADD CONSTRAINT pk_role PRIMARY KEY (role_id);


-- =========================================
-- APP_USER (instead of reserved word "user")
-- =========================================
CREATE TABLE app_user (
    user_id       BIGSERIAL,
    person_id     BIGINT NOT NULL,
    role_id       INTEGER NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    deleted_at    TIMESTAMPTZ
);

ALTER TABLE app_user
    ADD CONSTRAINT pk_app_user PRIMARY KEY (user_id);

ALTER TABLE app_user
    ADD CONSTRAINT fk_app_user_person
        FOREIGN KEY (person_id)
        REFERENCES person(person_id);

ALTER TABLE app_user
    ADD CONSTRAINT fk_app_user_role
        FOREIGN KEY (role_id)
        REFERENCES role(role_id);

CREATE INDEX idx_app_user_person_id
    ON app_user(person_id);

CREATE INDEX idx_app_user_role_id
    ON app_user(role_id);


-- =========================================
-- CLIENT
-- =========================================
CREATE TABLE client (
    client_id  BIGSERIAL,
    person_id  BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE client
    ADD CONSTRAINT pk_client PRIMARY KEY (client_id);

ALTER TABLE client
    ADD CONSTRAINT fk_client_person
        FOREIGN KEY (person_id)
        REFERENCES person(person_id);

-- Uncomment if you want 1-to-1 person-client
-- ALTER TABLE client
--     ADD CONSTRAINT uq_client_person UNIQUE (person_id);

CREATE INDEX idx_client_person_id
    ON client(person_id);


-- =========================================
-- MEMBERSHIP
-- =========================================
CREATE TABLE membership (
    membership_id   BIGSERIAL,
    membership_name VARCHAR(100) NOT NULL,
    description     TEXT,
    price           NUMERIC(10,2) NOT NULL,
    duration_days   INTEGER NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE membership
    ADD CONSTRAINT pk_membership PRIMARY KEY (membership_id);


-- =========================================
-- PAYMENT_METHOD
-- =========================================
CREATE TABLE payment_method (
    payment_method_id SERIAL,
    name              VARCHAR(50) NOT NULL,
    description       VARCHAR(255)
);

ALTER TABLE payment_method
    ADD CONSTRAINT pk_payment_method PRIMARY KEY (payment_method_id);


-- =========================================
-- CLIENT_MEMBERSHIP (with frozen agreed_price)
-- =========================================
CREATE TABLE client_membership (
    client_membership_id BIGSERIAL,
    client_id            BIGINT NOT NULL,
    membership_id        BIGINT NOT NULL,
    start_date           DATE NOT NULL,
    status               client_membership_status NOT NULL DEFAULT 'ACTIVE',
    agreed_price         NUMERIC(10,2) NOT NULL,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE client_membership
    ADD CONSTRAINT pk_client_membership PRIMARY KEY (client_membership_id);

ALTER TABLE client_membership
    ADD CONSTRAINT fk_client_membership_client
        FOREIGN KEY (client_id)
        REFERENCES client(client_id);

ALTER TABLE client_membership
    ADD CONSTRAINT fk_client_membership_membership
        FOREIGN KEY (membership_id)
        REFERENCES membership(membership_id);

CREATE INDEX idx_client_membership_client_id
    ON client_membership(client_id);

CREATE INDEX idx_client_membership_membership_id
    ON client_membership(membership_id);


-- =========================================
-- PAYMENT (payment moment uses TIMESTAMPTZ)
-- =========================================
CREATE TABLE payment (
    payment_id           BIGSERIAL,
    client_membership_id BIGINT NOT NULL,
    payment_method_id    INTEGER NOT NULL,
    amount               NUMERIC(10,2) NOT NULL,
    paid_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payment
    ADD CONSTRAINT pk_payment PRIMARY KEY (payment_id);

ALTER TABLE payment
    ADD CONSTRAINT fk_payment_client_membership
        FOREIGN KEY (client_membership_id)
        REFERENCES client_membership(client_membership_id);

ALTER TABLE payment
    ADD CONSTRAINT fk_payment_payment_method
        FOREIGN KEY (payment_method_id)
        REFERENCES payment_method(payment_method_id);

CREATE INDEX idx_payment_client_membership_id
    ON payment(client_membership_id);

CREATE INDEX idx_payment_payment_method_id
    ON payment(payment_method_id);
