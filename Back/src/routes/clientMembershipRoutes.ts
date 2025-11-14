import { Router } from 'express';
import {
  getClientMembershipsController,
  createClientMembershipController,
} from '../controllers/clientMembershipController';

const router = Router();

// GET /clients/:clientId/memberships - Get all memberships for a client
router.get('/clients/:clientId/memberships', getClientMembershipsController);

// POST /client-memberships - Create new client membership
router.post('/', createClientMembershipController);

export default router;
