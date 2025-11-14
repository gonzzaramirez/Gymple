# Gymple API Endpoints

Base URL: `http://localhost:3000`

---

## 🏥 Health Check

### Check Server Status
```http
GET /health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2025-01-15T12:00:00.000Z"
}
```

---

## 👤 Clients

### Get All Clients
```http
GET /clients
```

### Get Client by ID
```http
GET /clients/:id
```

### Create Client
```http
POST /clients
Content-Type: application/json

{
  "firstName": "María",
  "lastName": "González",
  "email": "maria@example.com",
  "phone": "11-5555-9999"
}
```

### Delete Client
```http
DELETE /clients/:id
```

---

## 💪 Memberships

### Get All Memberships
```http
GET /memberships
```

### Get Membership by ID
```http
GET /memberships/:id
```

### Create Membership
```http
POST /memberships
Content-Type: application/json

{
  "name": "Premium Monthly",
  "description": "Full access to all facilities",
  "price": 5000.00,
  "durationDays": 30
}
```

---

## 🎫 Client Memberships

### Get Client's Memberships
```http
GET /clients/:clientId/memberships
```

### Create Client Membership
```http
POST /client-memberships
Content-Type: application/json

{
  "clientId": 1,
  "membershipId": 1,
  "startDate": "2025-01-15"
}
```

**Note:** The `agreedPrice` is automatically frozen from the membership's current price, and `endDate` is calculated from `startDate + durationDays`.

---

## 💳 Payment Methods

### Get All Payment Methods
```http
GET /payment-methods
```

### Get Payment Method by ID
```http
GET /payment-methods/:id
```

---

## 💵 Payments

### Get All Payments (Last 100)
```http
GET /payments
```

### Get Payments by Client Membership
```http
GET /client-memberships/:clientMembershipId/payments
```

### Create Payment
```http
POST /payments
Content-Type: application/json

{
  "clientMembershipId": 1,
  "paymentMethodId": 1,
  "amount": 5000.00,
  "paidAt": "2025-01-15T10:30:00Z"
}
```

**Note:** `paidAt` is optional and defaults to current timestamp if not provided.

---

## 📝 Complete Example Workflow

### 1. Create a Client
```bash
curl -X POST http://localhost:3000/clients \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com",
    "phone": "11-1234-5678"
  }'
```

### 2. Create a Membership Type
```bash
curl -X POST http://localhost:3000/memberships \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Basic Monthly",
    "description": "Standard gym access",
    "price": 3000.00,
    "durationDays": 30
  }'
```

### 3. Assign Membership to Client
```bash
curl -X POST http://localhost:3000/client-memberships \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "membershipId": 1,
    "startDate": "2025-01-15"
  }'
```

### 4. Get Payment Methods
```bash
curl http://localhost:3000/payment-methods
```

### 5. Register a Payment
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "clientMembershipId": 1,
    "paymentMethodId": 1,
    "amount": 3000.00
  }'
```

### 6. View Client's Memberships
```bash
curl http://localhost:3000/clients/1/memberships
```

### 7. View Membership's Payments
```bash
curl http://localhost:3000/client-memberships/1/payments
```

---

## 🔄 Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid input or missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 📊 Data Models

### Client
```typescript
{
  clientId: number,
  createdAt: Date,
  person: {
    personId: number,
    firstName: string,
    lastName: string,
    phone?: string | null,
    email: string,
    createdAt: Date
  }
}
```

### Membership
```typescript
{
  membershipId: number,
  name: string,
  description?: string | null,
  price: number,
  durationDays: number,
  createdAt: Date
}
```

### Client Membership
```typescript
{
  clientMembershipId: number,
  clientId: number,
  membershipId: number,
  agreedPrice: number,       // Frozen price at signup
  startDate: Date,
  endDate: Date,             // Computed: startDate + durationDays
  status: "ACTIVE" | "PAUSED" | "CANCELLED",
  createdAt: Date,
  client: { ... },
  membership: { ... }
}
```

### Payment
```typescript
{
  paymentId: number,
  clientMembershipId: number,
  paymentMethodId: number,
  amount: number,
  paidAt: Date,
  createdAt: Date,
  clientMembership: { ... },
  paymentMethod: { ... }
}
```

### Payment Method
```typescript
{
  paymentMethodId: number,
  name: string,
  description?: string | null
}
```
