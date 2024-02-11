import express from 'express';
import { sendMessage , getMessage } from '../controllers/message.controller.js';
import protectroute from '../middleware/protectroute.js';

const router = express.Router();

router.get('/:id',protectroute, getMessage);
router.post('/send/:id',protectroute, sendMessage);

export default router;