import { Router } from 'express';
import {
  getAllClientsController,
  getClientByIdController,
  createClientController,
  deleteClientController,
} from '../controllers/clientController';

const router = Router();

// GET /clients - Get all clients
router.get('/', getAllClientsController);

// GET /clients/:id - Get client by ID
router.get('/:id', getClientByIdController);

// POST /clients - Create new client
router.post('/', createClientController);

// DELETE /clients/:id - Delete client by ID
router.delete('/:id', deleteClientController);

export default router;
