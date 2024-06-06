import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './firebaseConfig.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'taskmindsecret',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-task', (req, res) => {
    res.render('addTask');
});

app.get('/view-task/:id', async (req, res) => {
    const taskDoc = doc(db, 'tasks', req.params.id);
    const task = await getDoc(taskDoc);
    if (task.exists()) {
        res.render('view-task', { task: task.data(), id: req.params.id });
    } else {
        res.status(404).send("Tarefa não encontrada.");
    }
});

app.get('/edit-task/:id', async (req, res) => {
    const taskDoc = doc(db, 'tasks', req.params.id);
    const task = await getDoc(taskDoc);
    if (task.exists()) {
        res.render('editTask', { task: task.data(), id: req.params.id });
    } else {
        res.status(404).send("Tarefa não encontrada.");
    }
});

// Rota para exibir tarefas concluídas
app.get('/completed-tasks', async (req, res) => {
    try {
        const userId = req.session.userId;
        const q = query(collection(db, 'tasks'), where('completed', '==', true), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.render('completed-tasks', { tasks });
    } catch (error) {
        console.error("Erro ao buscar tarefas concluídas:", error);
        res.status(500).send("Erro ao buscar tarefas concluídas.");
    }
});

// Rota de logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/api/tasks');
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
});

app.use('/api/tasks', taskRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export { app };
