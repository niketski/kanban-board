import { create } from "zustand";
import { Id, Priority, Task } from "../types";

interface TaskStoreState {
    tasks: Task[],
    activeTask: Task | null,
    setActiveTask: (task: Task | null) => void,
    createTask: (content: string, priority: Priority, columnId: Id, isEditMode?: boolean) => void,
    updateTask: (id: Id, priority: Priority, content: string, columnId: Id) => void,
    deleteTask: (id: Id) => void,
}

export const useTaskStore = create<TaskStoreState>()((set) => ({
    tasks: [],
    activeTask: null,
    setActiveTask: (task: Task | null) => {

        set(() => ({ activeTask: task }));

    },
    createTask: (content: string, priority: Priority, columnId: Id, isEditMode: boolean = false) => {
        const newTask: Task = {
            id: Date.now(), // generate unique id based on the date
            content,
            columnId,
            priority,
            isEditMode
        };

        set((state) => ({
            tasks: [...state.tasks, newTask]
        }));

    },
    updateTask: (id: Id, priority: Priority, content: string, columnId: Id) => {

        set(state => {
            const updatedTasks = state.tasks.map(task => {

                if(task.id != id) {
                  return task;
                }
          
                return {
                  ...task,
                  priority,
                  content,
                  columnId
                }
          
            });
        
            return {
                tasks: updatedTasks
            };
        });
    },
    deleteTask: (id: Id) => {
        
        set(state => {
            const filteredTasks = state.tasks.filter(task => task.id != id);

            return {
                tasks: filteredTasks
            }
        });
    }
}));