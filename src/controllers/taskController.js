import { db } from '../firebaseConfig.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore'; 

export async function getAllTasks(req, res) {
    try {
        const userId = req.session.userId; // Obter o ID do usuário da sessão
        const q = query(collection(db, 'tasks'), where('userId', '==', userId), where('completed', '==', false));
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.render('tasks', { tasks });
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        res.status(500).send("Erro ao buscar tarefas.");
    }
}

export async function addTask(req, res) {
    const { title, description, deadline, urgency } = req.body;
    const userId = req.session.userId; // Obter o ID do usuário da sessão
    try {
        const docRef = await addDoc(collection(db, 'tasks'), {
            title,
            description,
            deadline,
            urgency,
            completed: false,
            userId // Adicionar o ID do usuário à tarefa
        });
        console.log("Document written with ID: ", docRef.id);
        res.redirect('/api/tasks'); // Redirecionar para a URL de listagem de tarefas
    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
        res.status(500).send("Erro ao adicionar tarefa.");
    }
}

// Atualizar a função filterTasks para filtrar por userId
export async function filterTasks(req, res) {
    const { urgency } = req.body;
    const userId = req.session.userId; // Obter o ID do usuário da sessão
    try {
        let tasks;
        if (urgency === 'all') {
            const q = query(collection(db, 'tasks'), where('userId', '==', userId), where('completed', '==', false));
            const querySnapshot = await getDocs(q);
            tasks = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } else {
            const q = query(collection(db, 'tasks'), where('urgency', '==', urgency), where('userId', '==', userId), where('completed', '==', false));
            const querySnapshot = await getDocs(q);
            tasks = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        res.render('tasks', { tasks });
    } catch (error) {
        console.error("Erro ao filtrar tarefas:", error);
        res.status500.send("Erro ao filtrar tarefas.");
    }
}

export async function getTask(req, res) {
    try {
        const taskDoc = doc(db, 'tasks', req.params.id);
        const task = await getDoc(taskDoc);
        if (task.exists()) {
            res.render('view-task', { task: task.data(), id: req.params.id });
        } else {
            res.status(404).send("Tarefa não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao obter tarefa:", error);
        res.status(500).send("Erro ao obter tarefa.");
    }
}

export async function updateTask(req, res) {
    const { title, description, deadline, urgency } = req.body;
    try {
        const taskDoc = doc(db, 'tasks', req.params.id);
        await updateDoc(taskDoc, { title, description, deadline, urgency });
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        res.status(500).send("Erro ao atualizar tarefa.");
    }
}

export async function deleteTask(req, res) {
    try {
        const taskDoc = doc(db, 'tasks', req.params.id);
        await deleteDoc(taskDoc);
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        res.status(500).send("Erro ao deletar tarefa.");
    }
}

export async function completeTask(req, res) {
    try {
        const taskDoc = doc(db, 'tasks', req.params.id);
        await updateDoc(taskDoc, { completed: true });
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro ao marcar tarefa como concluída:", error);
        res.status(500).send("Erro ao marcar tarefa como concluída.");
    }
}

export async function getCompletedTasks(req, res) {
    try {
        const userId = req.session.userId; // Obter o ID do usuário da sessão
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
}
