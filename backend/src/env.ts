import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_FILE_NAME: z.string().startsWith('file:'),
    },
    runtimeEnv: process.env,
});
