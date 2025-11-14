import { Router } from 'express';
import {
  getPaymentsByClientMembershipController,
  getAllPaymentsController,
  createPaymentController,
} from '../controllers/paymentController';

const router = Router();

// GET /payments - Get all payments (last 100)
router.get('/', getAllPaymentsController);

// GET /client-memberships/:clientMembershipId/payments - Get payments for a client membership
router.get(
  '/client-memberships/:clientMembershipId/payments',
  getPaymentsByClientMembershipController,
);

// POST /payments - Create new payment
router.post('/', createPaymentController);

export default router;
