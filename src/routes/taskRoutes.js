import express from 'express';
import { getAllTasks, addTask, filterTasks, getTask, updateTask, deleteTask, completeTask } from '../controllers/taskController.js';
import { getQuote } from '../controllers/quotes.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/add', addTask);
router.post('/filter', filterTasks);
router.get('/view/:id', getTask); // Rota para visualizar a tarefa
router.get('/edit/:id', getTask); // Rota para obter os dados da tarefa para edição
router.post('/edit/:id', updateTask); // Rota para atualizar a tarefa
router.post('/delete/:id', deleteTask); // Corrigindo para POST
router.post('/complete/:id', completeTask); // Corrigindo para POST

router.get('/quote', getQuote); // Rota para obter citação motivacional

export default router;
