import Fastify from 'fastify';
import pino from 'pino';

// Create Fastify instance with Pino logger
const app = Fastify({
  logger: pino({
    level: process.env.LOG_LEVEL || 'info',
  }),
});

// Register routes
app.register(import('./routes'));

// Start server
const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3030, host: '0.0.0.0' });
    app.log.info(`Server running at http://localhost:${process.env.PORT || 3030}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

