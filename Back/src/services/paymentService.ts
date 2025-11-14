import prisma from '../config/database';

export interface CreatePaymentData {
  clientMembershipId: number;
  paymentMethodId: number;
  amount: number;
  paidAt?: Date;
}

export interface PaymentResponse {
  paymentId: number;
  clientMembershipId: number;
  paymentMethodId: number;
  amount: number;
  paidAt: Date;
  createdAt: Date;
  clientMembership: {
    clientMembershipId: number;
    clientId: number;
    agreedPrice: number;
    status: string;
    client: {
      person: {
        firstName: string;
        lastName: string;
        email: string;
      };
    };
  };
  paymentMethod: {
    paymentMethodId: number;
    name: string;
  };
}

export const getPaymentsByClientMembershipId = async (
  clientMembershipId: number,
): Promise<PaymentResponse[]> => {
  const payments = await prisma.payment.findMany({
    where: { client_membership_id: BigInt(clientMembershipId) },
    include: {
      client_membership: {
        include: {
          client: {
            include: {
              person: true,
            },
          },
        },
      },
      payment_method: true,
    },
    orderBy: { paid_at: 'desc' },
  });

  return payments.map((p) => ({
    paymentId: Number(p.payment_id),
    clientMembershipId: Number(p.client_membership_id),
    paymentMethodId: p.payment_method_id,
    amount: Number(p.amount),
    paidAt: p.paid_at,
    createdAt: p.created_at,
    clientMembership: {
      clientMembershipId: Number(p.client_membership.client_membership_id),
      clientId: Number(p.client_membership.client_id),
      agreedPrice: Number(p.client_membership.agreed_price),
      status: p.client_membership.status,
      client: {
        person: {
          firstName: p.client_membership.client.person.first_name,
          lastName: p.client_membership.client.person.last_name,
          email: p.client_membership.client.person.email,
        },
      },
    },
    paymentMethod: {
      paymentMethodId: p.payment_method.payment_method_id,
      name: p.payment_method.name,
    },
  }));
};

export const getAllPayments = async (): Promise<PaymentResponse[]> => {
  const payments = await prisma.payment.findMany({
    include: {
      client_membership: {
        include: {
          client: {
            include: {
              person: true,
            },
          },
        },
      },
      payment_method: true,
    },
    orderBy: { paid_at: 'desc' },
    take: 100, // Limit to last 100 payments
  });

  return payments.map((p) => ({
    paymentId: Number(p.payment_id),
    clientMembershipId: Number(p.client_membership_id),
    paymentMethodId: p.payment_method_id,
    amount: Number(p.amount),
    paidAt: p.paid_at,
    createdAt: p.created_at,
    clientMembership: {
      clientMembershipId: Number(p.client_membership.client_membership_id),
      clientId: Number(p.client_membership.client_id),
      agreedPrice: Number(p.client_membership.agreed_price),
      status: p.client_membership.status,
      client: {
        person: {
          firstName: p.client_membership.client.person.first_name,
          lastName: p.client_membership.client.person.last_name,
          email: p.client_membership.client.person.email,
        },
      },
    },
    paymentMethod: {
      paymentMethodId: p.payment_method.payment_method_id,
      name: p.payment_method.name,
    },
  }));
};

export const createPayment = async (data: CreatePaymentData): Promise<PaymentResponse> => {
  // Verify client membership exists
  const clientMembership = await prisma.client_membership.findUnique({
    where: { client_membership_id: BigInt(data.clientMembershipId) },
  });

  if (!clientMembership) {
    throw new Error('Client membership not found');
  }

  // Verify payment method exists
  const paymentMethod = await prisma.payment_method.findUnique({
    where: { payment_method_id: data.paymentMethodId },
  });

  if (!paymentMethod) {
    throw new Error('Payment method not found');
  }

  const payment = await prisma.payment.create({
    data: {
      client_membership_id: BigInt(data.clientMembershipId),
      payment_method_id: data.paymentMethodId,
      amount: data.amount,
      paid_at: data.paidAt || new Date(),
    },
    include: {
      client_membership: {
        include: {
          client: {
            include: {
              person: true,
            },
          },
        },
      },
      payment_method: true,
    },
  });

  return {
    paymentId: Number(payment.payment_id),
    clientMembershipId: Number(payment.client_membership_id),
    paymentMethodId: payment.payment_method_id,
    amount: Number(payment.amount),
    paidAt: payment.paid_at,
    createdAt: payment.created_at,
    clientMembership: {
      clientMembershipId: Number(payment.client_membership.client_membership_id),
      clientId: Number(payment.client_membership.client_id),
      agreedPrice: Number(payment.client_membership.agreed_price),
      status: payment.client_membership.status,
      client: {
        person: {
          firstName: payment.client_membership.client.person.first_name,
          lastName: payment.client_membership.client.person.last_name,
          email: payment.client_membership.client.person.email,
        },
      },
    },
    paymentMethod: {
      paymentMethodId: payment.payment_method.payment_method_id,
      name: payment.payment_method.name,
    },
  };
};
