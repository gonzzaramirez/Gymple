import prisma from '../config/database';
import { client_membership_status } from '@prisma/client';

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

export const getClientMembershipsByClientId = async (
  clientId: number,
): Promise<ClientMembershipResponse[]> => {
  const clientMemberships = await prisma.client_membership.findMany({
    where: { client_id: BigInt(clientId) },
    include: {
      client: {
        include: {
          person: true,
        },
      },
      membership: true,
    },
    orderBy: { start_date: 'desc' },
  });

  return clientMemberships.map((cm) => {
    // Calculate end date dynamically from start_date + duration_days
    const endDate = new Date(cm.start_date);
    endDate.setDate(endDate.getDate() + cm.membership.duration_days);

    return {
      clientMembershipId: Number(cm.client_membership_id),
      clientId: Number(cm.client_id),
      membershipId: Number(cm.membership_id),
      agreedPrice: Number(cm.agreed_price),
      startDate: cm.start_date,
      endDate: endDate,
      status: cm.status,
      createdAt: cm.created_at,
      client: {
        clientId: Number(cm.client.client_id),
        person: {
          firstName: cm.client.person.first_name,
          lastName: cm.client.person.last_name,
          email: cm.client.person.email,
        },
      },
      membership: {
        membershipId: Number(cm.membership.membership_id),
        name: cm.membership.membership_name,
        durationDays: cm.membership.duration_days,
      },
    };
  });
};

export const createClientMembership = async (
  data: CreateClientMembershipData,
): Promise<ClientMembershipResponse> => {
  // Get membership price to freeze it
  const membership = await prisma.membership.findUnique({
    where: { membership_id: BigInt(data.membershipId) },
  });

  if (!membership) {
    throw new Error('Membership not found');
  }

  // Calculate end date (not stored in DB, computed on the fly)
  const endDate = new Date(data.startDate);
  endDate.setDate(endDate.getDate() + membership.duration_days);

  const clientMembership = await prisma.client_membership.create({
    data: {
      client_id: BigInt(data.clientId),
      membership_id: BigInt(data.membershipId),
      agreed_price: membership.price,
      start_date: data.startDate,
      status: client_membership_status.ACTIVE,
    },
    include: {
      client: {
        include: {
          person: true,
        },
      },
      membership: true,
    },
  });

  // Calculate end date from start_date + duration_days
  const computedEndDate = new Date(clientMembership.start_date);
  computedEndDate.setDate(computedEndDate.getDate() + clientMembership.membership.duration_days);

  return {
    clientMembershipId: Number(clientMembership.client_membership_id),
    clientId: Number(clientMembership.client_id),
    membershipId: Number(clientMembership.membership_id),
    agreedPrice: Number(clientMembership.agreed_price),
    startDate: clientMembership.start_date,
    endDate: computedEndDate,
    status: clientMembership.status,
    createdAt: clientMembership.created_at,
    client: {
      clientId: Number(clientMembership.client.client_id),
      person: {
        firstName: clientMembership.client.person.first_name,
        lastName: clientMembership.client.person.last_name,
        email: clientMembership.client.person.email,
      },
    },
    membership: {
      membershipId: Number(clientMembership.membership.membership_id),
      name: clientMembership.membership.membership_name,
      durationDays: clientMembership.membership.duration_days,
    },
  };
};
