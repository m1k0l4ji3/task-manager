import { drizzle } from 'drizzle-orm/libsql/node';
import { env } from '../env.js';
import * as schema from './schema.js';

export const db = drizzle(env.DATABASE_FILE_NAME, { schema, logger: true });
