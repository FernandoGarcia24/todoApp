export interface Task {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;
}

export enum Filter {
    All = 'all',
    Completed = 'completed',
    Pending = 'pending'
}