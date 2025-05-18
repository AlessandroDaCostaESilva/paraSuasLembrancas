import express from 'express';
import { checkEmailDomain } from '../controllers/emailController.js';

const router = express.Router();

// Rota POST para validar e-mail
router.post('/validate-email', checkEmailDomain);

export default router;