import { Router } from 'express';
import {
  getAllMembershipsController,
  getMembershipByIdController,
  createMembershipController,
} from '../controllers/membershipController';

const router = Router();

// GET /memberships - Get all memberships
router.get('/', getAllMembershipsController);

// GET /memberships/:id - Get membership by ID
router.get('/:id', getMembershipByIdController);

// POST /memberships - Create new membership
router.post('/', createMembershipController);

export default router;
