"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function AdminPanel() {

    const { user, error, isLoading } = useUser();
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        if (user) {

            const roles = (user)['https:/myapp.com/roles']; // namespace
            if (Array.isArray(roles) && roles.includes('admin')) {
                setIsAdmin(true);
            }
        }
    }, [user]);

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user || !isAdmin) return <div>No tienes acceso a este panel</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">Panel de Administración</h1>
            {/* Aquí puedes colocar el contenido del panel */}
            <p>Bienvenido al panel de administración, {user.name}.</p>
        </div>
    );
}
