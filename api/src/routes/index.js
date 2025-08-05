import DatabaseService from '../services/databaseService.js';

// Import route plugins
import userRoutes from './users.js';
import projectRoutes from './projects.js';
import taskRoutes from './tasks.js';
import tagRoutes from './tags.js';
import imageRoutes from './images.js';

const dbService = new DatabaseService();

export default async function routes(fastify, options) {
  // Health check endpoint
  fastify.get('/health', async (request, reply) => {
    reply.send({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Root endpoint
  fastify.get('/', async (request, reply) => {
    reply.send({ 
      message: 'Task Blaster API', 
      version: '1.0.0',
      endpoints: ['/health', '/users', '/projects', '/tasks', '/tags', '/images']
    });
  });

  // Database connection test
  fastify.get('/db-test', async (request, reply) => {
    try {
      const result = await dbService.testConnection();
      reply.send({ status: 'Database connected', result });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Database connection failed', details: error.message });
    }
  });

  // Register route plugins with shared database service
  const pluginOptions = { dbService };
  
  await fastify.register(userRoutes, pluginOptions);
  await fastify.register(projectRoutes, pluginOptions);
  await fastify.register(taskRoutes, pluginOptions);
  await fastify.register(tagRoutes, pluginOptions);
  await fastify.register(imageRoutes, pluginOptions);
}
