"use client";
import { useEffect, useState } from "react";
import { useAutoState } from "@/lib/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

export default function AutoPage() {
    const { user, error, isLoading } = useUser();
    const autos = useAutoState((state) => state.autos);
    const fetchAutos = useAutoState((state) => state.fetchAutos);
    const addAuto = useAutoState((state) => state.addAuto);
    const editAuto = useAutoState((state) => state.editAuto);
    const deleteAuto = useAutoState((state) => state.deleteAuto);

    const [editInput, setEditInput] = useState("");
    const [autoToEdit, setAutoToEdit] = useState<number | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const getToken = async () => {
        try {
            const res = await axios.get("/api/auth/token");
            return res.data.accessToken;
        } catch (err) {
            console.error("Error fetching token:", err);
            return null;
        }
    };

    useEffect(() => {
        if (user) {
            const roles = user["https://myapp.com/roles"];
            setIsAdmin(Array.isArray(roles) && roles.includes("admin"));

            const fetchData = async () => {
                const token = await getToken();
                if (token) {
                    fetchAutos(token);
                }
            };

            fetchData();
        }
    }, [user, fetchAutos]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>Please log in</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Autos</h2>

            <ul className="space-y-4 mb-6">
                {autos.map((auto) => (
                    <li key={auto.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
                        <span>
                            <strong>{auto.id}:</strong> {auto.marca}
                        </span>
                        {isAdmin && (
                            <div className="flex space-x-2">
                                {autoToEdit === auto.id ? (
                                    <input
                                        type="text"
                                        value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}
                                        placeholder="Editar marca"
                                        className="border p-2"
                                    />
                                ) : null}
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    onClick={async () => {
                                        const token = await getToken();
                                        if (token) {
                                            if (autoToEdit === auto.id) {
                                                await editAuto(auto.id, editInput, token);
                                                setAutoToEdit(null);
                                                setEditInput("");
                                            } else {
                                                setAutoToEdit(auto.id);
                                                setEditInput(auto.marca);
                                            }
                                        }
                                    }}
                                >
                                    {autoToEdit === auto.id ? "Guardar" : "Editar"}
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    onClick={async () => {
                                        const token = await getToken();
                                        if (token) {
                                            await deleteAuto(auto.id, token);
                                        }
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {isAdmin && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Marca del auto"
                        id="autoInput"
                        className="w-full p-2 border rounded-md shadow-sm mb-4"
                    />
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                        onClick={async () => {
                            const marca = (document.getElementById("autoInput") as HTMLInputElement).value;
                            const token = await getToken();
                            if (token) {
                                await addAuto(marca, token);
                            }
                        }}
                    >
                        Agregar Auto
                    </button>
                </div>
            )}
        </div>
    );
}
