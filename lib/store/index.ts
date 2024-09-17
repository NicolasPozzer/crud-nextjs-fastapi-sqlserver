import { Auto } from "@/lib/types";
import { create } from "zustand";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL_BACK;

interface AutoState {
    autos: Auto[];
    fetchAutos: () => void;
    addAuto: (marca: string) => Promise<void>;
    editAuto: (id: number, marca: string) => Promise<void>;
    deleteAuto: (id: number) => Promise<void>;
}

export const useAutoState = create<AutoState>((set) => ({
    autos: [],

    fetchAutos: async () => {
        try {
            const response = await axios.get(`${apiUrl}/autos`);
            set({ autos: response.data });
        } catch (error) {
            console.error("Error fetching autos", error);
        }
    },

    addAuto: async (marca) => {
        try {
            const response = await axios.post(`${apiUrl}/autos/create`, { marca });
            set((state) => ({
                autos: [...state.autos, response.data],
            }));
        } catch (error) {
            console.error("Error adding auto", error);
        }
    },

    editAuto: async (id, marca) => {
        try {
            const response = await axios.put(`${apiUrl}/autos/edit/${id}`, { marca });
            set((state) => ({
                autos: state.autos.map((auto) =>
                    auto.id === id ? { ...auto, marca: response.data.marca } : auto
                ),
            }));
        } catch (error) {
            console.error("Error editing auto", error);
        }
    },

    deleteAuto: async (id) => {
        try {
            await axios.delete(`${apiUrl}/autos/${id}`);
            set((state) => ({
                autos: state.autos.filter((auto) => auto.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting auto", error);
        }
    },
}));
