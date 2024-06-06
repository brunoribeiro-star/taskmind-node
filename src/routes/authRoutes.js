import express from 'express';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig.js';

const router = express.Router();

// rota do form de login
router.get('/login', (req, res) => {
    res.render('login');
});

// rota p processar dados de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth(app);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        req.session.userId = userCredential.user.uid;
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro de login: ", error);
        res.status(401).send("Login falhou");
    }
});

// rota p formulario de cadastro
router.get('/register', (req, res) => {
    res.render('register');
});

// rota p processar o cadastro
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth(app);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        req.session.userId = userCredential.user.uid;
        res.redirect('/api/tasks');
    } catch (error) {
        console.error("Erro ao registrar: ", error);
        res.status(401).send("Registro falhou");
    }
});

// rota do logout
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
