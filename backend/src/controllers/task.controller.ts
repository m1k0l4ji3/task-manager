import { Request, Response } from 'express';
import { db } from '../db/db.js';
import { TaskSchema } from '../models/task.js';
import { z } from 'zod';
import { task } from '../db/schema.js';
import { count, eq, sql } from 'drizzle-orm';

export default class TaskController {
    public static async list(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = (page - 1) * limit;

            const tasks = await db.select().from(task).limit(limit).offset(offset).execute();

            const totalTasks = await db.select({ count: count() }).from(task).execute();

            const pageCount = Math.ceil(totalTasks[0].count / limit);

            const data = tasks.map((taskItem) => {
                taskItem.created_at = new Date(taskItem.created_at + 'Z').toString();
                taskItem.updated_at = new Date(taskItem.updated_at + 'Z').toString();
                return taskItem;
            });

            res.status(200).json({
                tasks: data,
                pagination: {
                    currentPage: page,
                    pageCount: pageCount,
                    itemsCount: totalTasks[0].count,
                    limit: limit,
                },
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    public static async details(req: Request, res: Response): Promise<void> {
        try {
            const taskItem = await db.query.task.findFirst({
                where: eq(task.id, Number(req.params.id)),
            });

            if (!taskItem) {
                res.status(404).json({ message: 'Task not found' });
                return;
            }

            const timeZone = 'Europe/Warsaw';
            taskItem.created_at = new Date(taskItem.created_at + 'Z').toLocaleString('pl-PL', { timeZone });
            taskItem.updated_at = new Date(taskItem.updated_at + 'Z').toLocaleString('pl-PL', { timeZone });

            res.status(200).json(taskItem);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const validatedTask = TaskSchema.parse(req.body);

            await db.insert(task).values(validatedTask).execute();

            res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            } else {
                res.status(500).json({ message: 'Failed to create task' });
            }
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id;
            const validatedTask = TaskSchema.parse(req.body);

            const result = await db
                .update(task)
                .set({
                    ...validatedTask,
                    updated_at: sql`CURRENT_TIMESTAMP`,
                })
                .where(eq(task.id, Number(taskId)))
                .execute();

            if (result.rowsAffected === 0) {
                res.status(404).json({ message: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Task updated successfully' });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.errors });
            } else {
                res.status(500).json({ message: 'Failed to update task' });
            }
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id;

            const result = await db
                .delete(task)
                .where(eq(task.id, Number(taskId)))
                .execute();

            if (result.rowsAffected === 0) {
                res.status(404).json({ message: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Task deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete task' });
        }
    }
}
