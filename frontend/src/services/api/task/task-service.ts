import axios, { AxiosResponse } from 'axios';
import { TaskItem, TaskListResponse } from './task-types';
import { z } from 'zod';
import { useNavigate } from '@solidjs/router';

export const TaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(30, 'Title is too long'),
    description: z.string().max(200, 'Description cannot exceed 200 characters').optional(),
    progress: z.number().min(0, 'Progress must be at least 0').max(100, 'Progress cannot exceed 100'),
});

export class TaskService {
    private httpClient = axios.create({
        baseURL: 'http://localhost:8000/',
        timeout: 10000,
    });

    async getTasks(): Promise<TaskListResponse> {
        const res = await this.httpClient.get<TaskListResponse>(`/task?page=1&limit=50`);

        return res.data;
    }

    async getTask(id: number): Promise<TaskItem> {
        const res = await this.httpClient.get<TaskItem>(`/task/${id}`);

        return res.data;
    }

    async createTask(task: z.infer<typeof TaskSchema>): Promise<AxiosResponse> {
        const res = await this.httpClient.post('/task', task);

        return res;
    }

    async updateTask(id: number, task: z.infer<typeof TaskSchema>): Promise<AxiosResponse> {
        const res = await this.httpClient.put(`/task/${id}`, task);

        return res;
    }

    async deleteTask(id: number): Promise<AxiosResponse> {
        const res = await this.httpClient.delete(`/task/${id}`);

        return res;
    }
}
