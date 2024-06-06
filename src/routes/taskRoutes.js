import express from 'express';
import { getAllTasks, addTask, filterTasks, getTask, updateTask, deleteTask, completeTask } from '../controllers/taskController.js';
import { getQuote } from '../controllers/quotes.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/add', addTask);
router.post('/filter', filterTasks);
router.get('/view/:id', getTask); // rota visualizar a tarefa
router.get('/edit/:id', getTask); // rota obter os dados da tarefa p edição
router.post('/edit/:id', updateTask); // rota atualizar a tarefa
router.post('/delete/:id', deleteTask); // corrigindo para POST
router.post('/complete/:id', completeTask); // Corrigindo para POST

router.get('/quote', getQuote); // rota api citacao

export default router;
