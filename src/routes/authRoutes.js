import express from 'express';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig.js';

const router = express.Router();

// Rota GET para exibir o formulário de login
router.get('/login', (req, res) => {
    res.render('login'); // Certifique-se de que você tem uma view 'login.ejs' em sua pasta de views
});

// Rota POST para processar as informações de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth(app);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        req.session.userId = userCredential.user.uid; // Armazenar o ID do usuário na sessão
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro de login: ", error);
        res.status(401).send("Login falhou");
    }
});

// Rota GET para exibir o formulário de registro
router.get('/register', (req, res) => {
    res.render('register'); // Certifique-se de que você tem uma view 'register.ejs' em sua pasta de views
});

// Rota POST para processar o registro
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth(app);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        req.session.userId = userCredential.user.uid; // Armazenar o ID do usuário na sessão
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro ao registrar: ", error);
        res.status(401).send("Registro falhou");
    }
});

// Rota GET para logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/api/tasks');
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
});

export default router;
