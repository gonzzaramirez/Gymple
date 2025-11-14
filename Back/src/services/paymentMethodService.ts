import prisma from '../config/database';
import { PaymentMethodResponse } from '../models/paymentMethod';

export const getAllPaymentMethods = async (): Promise<PaymentMethodResponse[]> => {
  const paymentMethods = await prisma.payment_method.findMany({
    orderBy: { name: 'asc' },
  });

  return paymentMethods.map((pm) => ({
    paymentMethodId: pm.payment_method_id,
    name: pm.name,
    description: pm.description,
  }));
};

export const getPaymentMethodById = async (id: number): Promise<PaymentMethodResponse | null> => {
  const paymentMethod = await prisma.payment_method.findUnique({
    where: { payment_method_id: id },
  });

  if (!paymentMethod) return null;

  return {
    paymentMethodId: paymentMethod.payment_method_id,
    name: paymentMethod.name,
    description: paymentMethod.description,
  };
};
