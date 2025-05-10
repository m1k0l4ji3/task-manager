import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text(),
    progress: integer().notNull().default(0),
    created_at: text()
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text()
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`),
});
