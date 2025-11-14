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
