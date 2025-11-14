-- Sample data for Gymple database

-- Persons
INSERT INTO person (first_name, last_name, phone, email)
VALUES
    ('Alice', 'Martinez', '+54-9-11-5555-1111', 'alice@example.com'),
    ('Bruno', 'Sosa', '+54-9-11-5555-2222', 'bruno@example.com'),
    ('Camila', 'Lopez', '+54-9-11-5555-3333', 'camila@example.com');

-- Roles
INSERT INTO role (name, description)
VALUES
    ('Admin', 'Full access to the system'),
    ('Trainer', 'Manages memberships and clients');

-- Users (link to person + role)
INSERT INTO app_user (person_id, role_id, password_hash)
VALUES
    (1, 1, '$2a$10$examplehashforalice...............'),
    (2, 2, '$2a$10$examplehashforbruno...............');

-- Clients (link to persons)
INSERT INTO client (person_id)
VALUES
    (2),  -- Bruno
    (3);  -- Camila

-- Membership definitions
INSERT INTO membership (membership_name, description, price, duration_days)
VALUES
    ('Monthly Unlimited', 'Unlimited gym access for 30 days', 45.00, 30),
    ('Quarterly Pro', 'Includes 2 personal trainer sessions per month', 120.00, 90);

-- Payment methods
INSERT INTO payment_method (name, description)
VALUES
    ('Cash', 'Cash payments at front desk'),
    ('Credit Card', 'Visa/Mastercard through POS');

-- Client memberships (freeze agreed price)
INSERT INTO client_membership (client_id, membership_id, start_date, status, agreed_price)
VALUES
    (1, 1, '2025-11-01', 'ACTIVE', 45.00),
    (2, 2, '2025-11-05', 'PAUSED', 115.00);

-- Payments
INSERT INTO payment (client_membership_id, payment_method_id, amount, paid_at)
VALUES
    (1, 2, 45.00, '2025-11-01T09:00:00Z'),
    (2, 1, 60.00, '2025-11-06T14:30:00Z');
