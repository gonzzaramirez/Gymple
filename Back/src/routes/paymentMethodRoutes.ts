import { Router } from 'express';
import {
  getAllPaymentMethodsController,
  getPaymentMethodByIdController,
} from '../controllers/paymentMethodController';

const router = Router();

// GET /payment-methods - Get all payment methods
router.get('/', getAllPaymentMethodsController);

// GET /payment-methods/:id - Get payment method by ID
router.get('/:id', getPaymentMethodByIdController);

export default router;
