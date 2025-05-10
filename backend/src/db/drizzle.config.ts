import { defineConfig } from 'drizzle-kit';
import { env } from '../env.js';

export default defineConfig({
    schema: './dist/db/schema.js',
    out: './migrations',
    dialect: 'sqlite',
    dbCredentials: {
        url: env.DATABASE_FILE_NAME,
    },
    verbose: true,
    strict: true,
});
