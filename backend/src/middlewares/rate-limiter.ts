import { Request, Response, NextFunction } from 'express';

const requestCounts: Record<string, { count: number; lastRequest: number }> = {};
const TIME_WINDOW = 5000;
const MAX_REQUESTS = 5;

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
    const ip = req.ip;
    const route = req.originalUrl;
    const key = `${ip}:${route}`;
    const currentTime = Date.now();

    if (!requestCounts[key]) {
        requestCounts[key] = { count: 1, lastRequest: currentTime };
    } else {
        const timeSinceLastRequest = currentTime - requestCounts[key].lastRequest;

        if (timeSinceLastRequest < TIME_WINDOW) {
            requestCounts[key].count += 1;
        } else {
            requestCounts[key].count = 1;
        }

        requestCounts[key].lastRequest = currentTime;

        if (requestCounts[key].count > MAX_REQUESTS) {
            res.status(429).json({ error: 'Too many requests. Please try again later.' });
            return;
        }
    }

    next();
}
