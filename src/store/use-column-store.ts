import { create } from "zustand";
import { Column, Id} from "../types";

interface ColumnStoreState {
    columns: Column[],
    activeColumn: Column | null,
    setActiveColumn: (column: Column | null) => void,
    createColumn: () => void,
    updateColumn: (id: Id, title: string) => void,
    deleteColumn: (id: Id) => void,
}

export const useColumnStore = create<ColumnStoreState>()((set, get) => ({
    columns: [],
    activeColumn: null,
    setActiveColumn: (column: Column | null) => {

        set(() => ({ activeColumn: column }));

    },
    createColumn: () => {
        const { columns } = get();
        const newColumn = {
            id: Date.now(), // generate unique id based on the date
            title: `Column ${columns.length + 1}`
        }

        set((state) => ({
            columns: [...state.columns, newColumn]
        }));

    },
    updateColumn: (id: Id, title: string) => {
        const { columns } = get();

        const updatedColumns = columns.map(column => {

            if(column.id !== id) {
                return column;
            }
        
            return {
                ...column,
                title
            }

        });

        set(() => ({
            columns: updatedColumns
        }));

    },
    deleteColumn: (id: Id) => {
        const { columns } = get();
        const updatedcolumns = columns.filter(column => column.id !== id);
        
        set(() => ({
            columns: updatedcolumns
        }));

    }
}))
