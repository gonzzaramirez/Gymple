import express from 'express';
import dotenv from 'dotenv';
import clientRoutes from './routes/clientRoutes';
import membershipRoutes from './routes/membershipRoutes';
import clientMembershipRoutes from './routes/clientMembershipRoutes';
import paymentRoutes from './routes/paymentRoutes';
import paymentMethodRoutes from './routes/paymentMethodRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/clients', clientRoutes);
app.use('/memberships', membershipRoutes);
app.use('/client-memberships', clientMembershipRoutes);
app.use('/payments', paymentRoutes);
app.use('/payment-methods', paymentMethodRoutes);

// Nested routes
app.use('/', clientMembershipRoutes); // GET /clients/:clientId/memberships
app.use('/', paymentRoutes); // GET /client-memberships/:clientMembershipId/payments

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
