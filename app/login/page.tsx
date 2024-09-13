"use client";

import { useUser } from '@auth0/nextjs-auth0/client';

export default function LoginPage() {
    const { user } = useUser();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {user ? (
                <>
                    <h2 className="text-2xl mb-4">Hola, {user.name}</h2>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => window.location.href = '/api/auth/logout'}
                    >
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-2xl mb-4">Inicia Sesión</h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => window.location.href = '/api/auth/login'}
                    >
                        Iniciar Sesión
                    </button>
                </>
            )}
        </div>
    );
}
