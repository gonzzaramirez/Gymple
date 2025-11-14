export interface CreateClientMembershipData {
  clientId: number;
  membershipId: number;
  startDate: Date;
}

export interface ClientMembershipResponse {
  clientMembershipId: number;
  clientId: number;
  membershipId: number;
  agreedPrice: number;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  client: {
    clientId: number;
    person: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  membership: {
    membershipId: number;
    name: string;
    durationDays: number;
  };
}
