// src/middlewares/auth.js
export function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/auth/login');
}
