import { Request, Response } from 'express';
import {
  getClientMembershipsByClientId,
  createClientMembership,
  CreateClientMembershipData,
} from '../services/clientMembershipService';

export const getClientMembershipsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const clientId = Number(req.params.clientId);
    if (isNaN(clientId)) {
      res.status(400).json({ error: 'Invalid client ID' });
      return;
    }

    const memberships = await getClientMembershipsByClientId(clientId);
    res.json(memberships);
  } catch (error) {
    console.error('Error fetching client memberships:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createClientMembershipController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data: CreateClientMembershipData = req.body;

    if (!data.clientId || !data.membershipId || !data.startDate) {
      res.status(400).json({
        error: 'Missing required fields: clientId, membershipId, startDate',
      });
      return;
    }

    // Parse startDate if it's a string
    const startDate =
      typeof data.startDate === 'string' ? new Date(data.startDate) : data.startDate;

    const newClientMembership = await createClientMembership({
      ...data,
      startDate,
    });
    res.status(201).json(newClientMembership);
  } catch (error) {
    console.error('Error creating client membership:', error);
    if (error instanceof Error && error.message === 'Membership not found') {
      res.status(404).json({ error: 'Membership not found' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
