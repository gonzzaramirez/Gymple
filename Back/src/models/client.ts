export interface CreateClientData {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
}

export interface ClientWithPerson {
  clientId: number;
  createdAt: Date;
  person: {
    personId: number;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email: string;
    createdAt: Date;
  };
}
