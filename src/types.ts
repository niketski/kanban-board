export type Id = string | number;

export type Column = {
    id: Id,
    title: string
}

export type Priority = 'high' | 'medium' | 'low';

export type Task = {
    id: Id,
    content: string,
    priority: Priority
    columnId: Id,
    isEditMode?: boolean
}