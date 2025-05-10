import { db } from './db.js';
import { task } from './schema.js';

async function main() {
    const tasks = Array.from({ length: 15 }, (_, i) => ({
        title: `Task ${i + 1}`,
        description: `Description for Task ${i + 1}`,
        progress: Math.floor(Math.random() * 101),
    }));

    await db.insert(task).values(tasks).execute();
}

main()
    .then(() => {
        console.log('Database seeding completed.');
    })
    .catch((error) => {
        console.error('Error during database seeding:', error);
    });
