import { Request, Response } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  deleteClient,
  CreateClientData,
} from '../services/clientService';

export const getAllClientsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getClientByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid client ID' });
      return;
    }

    const client = await getClientById(id);
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }

    res.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createClientController = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreateClientData = req.body;

    if (!data.firstName || !data.lastName || !data.email) {
      res.status(400).json({
        error: 'Missing required fields: firstName, lastName, email',
      });
      return;
    }

    const newClient = await createClient(data);
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteClientController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid client ID' });
      return;
    }

    const deleted = await deleteClient(id);
    if (!deleted) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
