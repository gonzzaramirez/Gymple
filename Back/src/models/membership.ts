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
