import prisma from '../config/database';

export interface MembershipData {
  name: string;
  description?: string;
  price: number;
  durationDays: number;
}

export interface MembershipResponse {
  membershipId: number;
  name: string;
  description?: string | null;
  price: number;
  durationDays: number;
  createdAt: Date;
}

export const getAllMemberships = async (): Promise<MembershipResponse[]> => {
  const memberships = await prisma.membership.findMany({
    orderBy: { membership_name: 'asc' },
  });

  return memberships.map((m) => ({
    membershipId: Number(m.membership_id),
    name: m.membership_name,
    description: m.description,
    price: Number(m.price),
    durationDays: m.duration_days,
    createdAt: m.created_at,
  }));
};

export const getMembershipById = async (id: number): Promise<MembershipResponse | null> => {
  const membership = await prisma.membership.findUnique({
    where: { membership_id: BigInt(id) },
  });

  if (!membership) return null;

  return {
    membershipId: Number(membership.membership_id),
    name: membership.membership_name,
    description: membership.description,
    price: Number(membership.price),
    durationDays: membership.duration_days,
    createdAt: membership.created_at,
  };
};

export const createMembership = async (data: MembershipData): Promise<MembershipResponse> => {
  const membership = await prisma.membership.create({
    data: {
      membership_name: data.name,
      description: data.description,
      price: data.price,
      duration_days: data.durationDays,
    },
  });

  return {
    membershipId: Number(membership.membership_id),
    name: membership.membership_name,
    description: membership.description,
    price: Number(membership.price),
    durationDays: membership.duration_days,
    createdAt: membership.created_at,
  };
};
