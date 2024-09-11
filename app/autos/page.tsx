"use client";
import { useEffect, useState } from "react";
import { useAutoState } from "@/lib/store";

export default function AutoPage() {
    const autos = useAutoState((state) => state.autos);
    const fetchAutos = useAutoState((state) => state.fetchAutos);
    const addAuto = useAutoState((state) => state.addAuto);
    const editAuto = useAutoState((state) => state.editAuto);
    const deleteAuto = useAutoState((state) => state.deleteAuto);

    // Estado local para almacenar la nueva marca al editar
    const [editInput, setEditInput] = useState("");
    const [autoToEdit, setAutoToEdit] = useState<number | null>(null);

    // Obtener los autos al cargar la página
    useEffect(() => {
        fetchAutos();
    }, [fetchAutos]);

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Autos</h2>

            <ul className="space-y-4 mb-6">
                {autos.map((auto) => (
                    <li
                        key={auto.id}
                        className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md"
                    >
                        <span>
                            <strong>{auto.id}:</strong> {auto.marca}
                        </span>
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
                                onClick={() => {
                                    if (autoToEdit === auto.id) {
                                        editAuto(auto.id, editInput);
                                        setAutoToEdit(null);
                                        setEditInput("");
                                    } else {
                                        setAutoToEdit(auto.id);
                                        setEditInput(auto.marca); // Para prellenar con la marca actual
                                    }
                                }}
                            >
                                {autoToEdit === auto.id ? "Guardar" : "Editar"}
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                onClick={() => deleteAuto(auto.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Marca del auto"
                    id="autoInput"
                    className="w-full p-2 border rounded-md shadow-sm mb-4"
                />
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => {
                        const marca = (document.getElementById("autoInput") as HTMLInputElement)
                            .value;
                        addAuto(marca);
                    }}
                >
                    Agregar Auto
                </button>
            </div>
        </div>
    );
}
