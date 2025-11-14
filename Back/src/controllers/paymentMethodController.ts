import { Request, Response } from 'express';
import { getAllPaymentMethods, getPaymentMethodById } from '../services/paymentMethodService';

export const getAllPaymentMethodsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const paymentMethods = await getAllPaymentMethods();
    res.json(paymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPaymentMethodByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid payment method ID' });
      return;
    }

    const paymentMethod = await getPaymentMethodById(id);
    if (!paymentMethod) {
      res.status(404).json({ error: 'Payment method not found' });
      return;
    }

    res.json(paymentMethod);
  } catch (error) {
    console.error('Error fetching payment method:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
