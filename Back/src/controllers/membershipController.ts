import { Request, Response } from 'express';
import {
  getAllMemberships,
  getMembershipById,
  createMembership,
} from '../services/membershipService';
import { MembershipData } from '../models/membership';

export const getAllMembershipsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const memberships = await getAllMemberships();
    res.json(memberships);
  } catch (error) {
    console.error('Error fetching memberships:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMembershipByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid membership ID' });
      return;
    }

    const membership = await getMembershipById(id);
    if (!membership) {
      res.status(404).json({ error: 'Membership not found' });
      return;
    }

    res.json(membership);
  } catch (error) {
    console.error('Error fetching membership:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createMembershipController = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: MembershipData = req.body;

    if (!data.name || !data.price || !data.durationDays) {
      res.status(400).json({
        error: 'Missing required fields: name, price, durationDays',
      });
      return;
    }

    const newMembership = await createMembership(data);
    res.status(201).json(newMembership);
  } catch (error) {
    console.error('Error creating membership:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
