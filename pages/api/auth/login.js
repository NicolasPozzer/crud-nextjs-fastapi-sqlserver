// pages/api/auth/login.js
import { handleLogin } from '@auth0/nextjs-auth0';

export default async function login(req, res) {
    try {
        await handleLogin(req, res, {
            authorizationParams: {
                audience: 'https://your-api-endpoint/', // La audience de tu API en Auth0
                scope: 'openid profile email', // Ajusta los scopes que necesites
            },
        });
    } catch (error) {
        res.status(error.status || 500).end(error.message);
    }
}