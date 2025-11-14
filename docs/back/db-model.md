# Gymple Database Model

```mermaid
erDiagram
    PERSON {
        bigint person_id PK
        varchar first_name
        varchar last_name
        varchar phone
        varchar email
        timestamptz created_at
    }

    ROLE {
        int role_id PK
        varchar name
        varchar description
    }

    APP_USER {
        bigint user_id PK
        bigint person_id FK
        int role_id FK
        varchar password_hash
        timestamptz deleted_at
    }

    CLIENT {
        bigint client_id PK
        bigint person_id FK
        timestamptz created_at
    }

    MEMBERSHIP {
        bigint membership_id PK
        varchar membership_name
        text description
        numeric price
        int duration_days
        timestamptz created_at
    }

    PAYMENT_METHOD {
        int payment_method_id PK
        varchar name
        varchar description
    }

    CLIENT_MEMBERSHIP {
        bigint client_membership_id PK
        bigint client_id FK
        bigint membership_id FK
        date start_date
        enum status
        numeric agreed_price
        timestamptz created_at
        timestamptz updated_at
    }

    PAYMENT {
        bigint payment_id PK
        bigint client_membership_id FK
        int payment_method_id FK
        numeric amount
        timestamptz paid_at
        timestamptz created_at
    }

    PERSON ||--o{ CLIENT : "has"
    PERSON ||--o{ APP_USER : "auth for"
    ROLE ||--o{ APP_USER : "assigns"
    CLIENT ||--o{ CLIENT_MEMBERSHIP : "owns"
    MEMBERSHIP ||--o{ CLIENT_MEMBERSHIP : "type"
    CLIENT_MEMBERSHIP ||--o{ PAYMENT : "is paid by"
    PAYMENT_METHOD ||--o{ PAYMENT : "method"
```

## Explanation

- **Person**: real-world person. Holds contact info and email (unique).
- **Client**: a person that buys memberships.
- **Role** + **AppUser**: authentication/authorization layer linked to a person.
- **Membership**: definition of membership types (name, current price, duration).
- **ClientMembership**: specific subscription of a client to a membership.
  - `agreed_price` freezes the price at signup time for traceability.
  - `status` is an enum: ACTIVE / PAUSED / CANCELLED.
- **Payment**: payments made for a client membership.
  - `paid_at` stores exact payment timestamp (TIMESTAMPTZ).
- **PaymentMethod**: cash, credit card, etc.

This model lets you:

- Change membership prices over time without losing what each client actually agreed to pay.
- Track every payment with its exact timestamp and method.
- Separate person data from user credentials, keeping the design clean and extensible.
