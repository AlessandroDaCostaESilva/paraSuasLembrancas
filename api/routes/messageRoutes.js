import express from 'express';
import {
    createMessageController,
    getAllMessagesController,
    getMessageByIdController,
    deleteMessageController,
    getUserMessageByIdController,
    getUserByMessageIdController,
    updateMessageController,
    getMessagesByUserIdController,
    deleteMessageControllerByAdmin,
    getHistoryByMessageId
    
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/mensagens', createMessageController);
router.get('/mensagens', getAllMessagesController);
router.get('/mensagens/:id', getMessageByIdController);
router.get('/usuarios/:userId/mensagens/:messageId', getUserMessageByIdController);
router.get('/mensagens/:messageId/usuario', getUserByMessageIdController);
router.delete('/mensagens/:id', deleteMessageController);
router.put('/mensagens/:id', updateMessageController);
router.delete('/messagens/admin/:id', deleteMessageControllerByAdmin);
router.get('/mensagens/:userId/mensagens', getMessagesByUserIdController); // rota para pega todas as mensagem de um unico usuario

export default router;
