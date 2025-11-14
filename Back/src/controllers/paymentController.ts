import { Request, Response } from 'express';
import {
  getPaymentsByClientMembershipId,
  getAllPayments,
  createPayment,
  CreatePaymentData,
} from '../services/paymentService';

export const getPaymentsByClientMembershipController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const clientMembershipId = Number(req.params.clientMembershipId);
    if (isNaN(clientMembershipId)) {
      res.status(400).json({ error: 'Invalid client membership ID' });
      return;
    }

    const payments = await getPaymentsByClientMembershipId(clientMembershipId);
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPaymentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPaymentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreatePaymentData = req.body;

    if (!data.clientMembershipId || !data.paymentMethodId || !data.amount) {
      res.status(400).json({
        error: 'Missing required fields: clientMembershipId, paymentMethodId, amount',
      });
      return;
    }

    // Parse paidAt if provided
    if (data.paidAt && typeof data.paidAt === 'string') {
      data.paidAt = new Date(data.paidAt);
    }

    const newPayment = await createPayment(data);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error creating payment:', error);
    if (error instanceof Error) {
      if (error.message === 'Client membership not found') {
        res.status(404).json({ error: 'Client membership not found' });
        return;
      }
      if (error.message === 'Payment method not found') {
        res.status(404).json({ error: 'Payment method not found' });
        return;
      }
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
