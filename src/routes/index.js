import { USERS, TASKS, PROJECTS, IMAGE_METADATA, TAGS } from '../../lib/db/schema';
import { db } from '../../lib/db';

export default async function (app, opts) {
  // Example route to get all users
  app.get('/users', async (request, reply) => {
    const users = await db.select().from(USERS);
    reply.send(users);
  });

  // Example route to get all tasks
  app.get('/tasks', async (request, reply) => {
    const tasks = await db.select().from(TASKS);
    reply.send(tasks);
  });

  // Add additional routes for projects, tags, image metadata, etc.
}

