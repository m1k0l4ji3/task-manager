import { z } from 'zod';

export const TaskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'Title is required').max(30, 'Title is too long'),
    description: z.string().max(200, 'Description cannot exceed 200 characters').optional(),
    progress: z.number().min(0, 'Progress must be at least 0').max(100, 'Progress cannot exceed 100'),
});

export type Task = z.infer<typeof TaskSchema>;
