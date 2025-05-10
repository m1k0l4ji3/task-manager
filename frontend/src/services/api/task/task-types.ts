export interface Pagination {
    currentPage: number;
    pageCount: number;
    itemsCount: number;
    limit: number;
}

export interface TaskListItem {
    id: number;
    title: string;
    description: string | null;
    progress: number;
    created_at: string;
    updated_at: string;
}

export interface TaskListResponse {
    tasks: TaskListItem[];
    pagination: Pagination;
}

export interface TaskItem {
    id: number;
    title: string;
    description: string | null;
    progress: number;
    created_at: string;
    updated_at: string;
}
