// lib/auth0.ts
import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
    scope: "openid profile email",
    audience: process.env.AUTH0_AUDIENCE, // Para acceder a la API del backend si tienes un backend protegido
    session: {
        cookieSecret: process.env.SESSION_COOKIE_SECRET,
        cookieLifetime: 7200, // Tiempo en segundos (2 horas)
    },
});
