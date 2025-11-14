import prisma from '../config/database';

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

export const getAllClients = async (): Promise<ClientWithPerson[]> => {
  const clients = await prisma.client.findMany({
    include: {
      person: true,
    },
  });

  return clients.map((client) => ({
    clientId: Number(client.client_id),
    createdAt: client.created_at,
    person: {
      personId: Number(client.person.person_id),
      firstName: client.person.first_name,
      lastName: client.person.last_name,
      phone: client.person.phone,
      email: client.person.email,
      createdAt: client.person.created_at,
    },
  }));
};

export const getClientById = async (id: number): Promise<ClientWithPerson | null> => {
  const client = await prisma.client.findUnique({
    where: { client_id: BigInt(id) },
    include: {
      person: true,
    },
  });

  if (!client) return null;

  return {
    clientId: Number(client.client_id),
    createdAt: client.created_at,
    person: {
      personId: Number(client.person.person_id),
      firstName: client.person.first_name,
      lastName: client.person.last_name,
      phone: client.person.phone,
      email: client.person.email,
      createdAt: client.person.created_at,
    },
  };
};

export const createClient = async (data: CreateClientData): Promise<ClientWithPerson> => {
  const person = await prisma.person.create({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
    },
  });

  const client = await prisma.client.create({
    data: {
      person_id: person.person_id,
    },
    include: {
      person: true,
    },
  });

  return {
    clientId: Number(client.client_id),
    createdAt: client.created_at,
    person: {
      personId: Number(person.person_id),
      firstName: person.first_name,
      lastName: person.last_name,
      phone: person.phone,
      email: person.email,
      createdAt: person.created_at,
    },
  };
};

export const deleteClient = async (id: number): Promise<boolean> => {
  const existing = await prisma.client.findUnique({
    where: { client_id: BigInt(id) },
  });

  if (!existing) return false;

  await prisma.client.delete({
    where: { client_id: BigInt(id) },
  });

  return true;
};
