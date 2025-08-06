import { projectSchemas } from '../schemas/validation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export default async function projectRoutes(fastify, options) {
  const { dbService } = options;

  // Add authentication middleware to all project routes
  fastify.addHook('preHandler', authMiddleware);

  // GET /projects - List all projects with details
  fastify.get('/projects', {
    schema: projectSchemas.getProjects
  }, async (request, reply) => {
    try {
      const projects = await dbService.getProjectsWithDetails();
      reply.send(projects);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to fetch projects' });
    }
  });

  // GET /projects/:id - Get specific project
  fastify.get('/projects/:id', {
    schema: projectSchemas.getProjectById
  }, async (request, reply) => {
    try {
      const { id } = request.params;
      const project = await dbService.getProjectById(parseInt(id));
      
      if (!project) {
        return reply.code(404).send({ error: 'Project not found' });
      }
      
      reply.send(project);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to fetch project' });
    }
  });

  // POST /projects - Create new project
  fastify.post('/projects', {
    schema: projectSchemas.createProject
  }, async (request, reply) => {
    try {
      const project = await dbService.createProject(request.body);
      reply.code(201).send(project);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to create project' });
    }
  });

  // PUT /projects/:id - Update project
  fastify.put('/projects/:id', {
    schema: projectSchemas.updateProject
  }, async (request, reply) => {
    try {
      const { id } = request.params;
      const project = await dbService.updateProject(parseInt(id), request.body);
      
      if (!project) {
        return reply.code(404).send({ error: 'Project not found' });
      }
      
      reply.send(project);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to update project' });
    }
  });

  // DELETE /projects/:id - Delete project
  fastify.delete('/projects/:id', {
    schema: projectSchemas.deleteProject
  }, async (request, reply) => {
    try {
      const { id } = request.params;
      const project = await dbService.deleteProject(parseInt(id));
      
      if (!project) {
        return reply.code(404).send({ error: 'Project not found' });
      }
      
      reply.send({ message: 'Project deleted successfully', project });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to delete project' });
    }
  });

  // GET /projects/:id/tasks - Get tasks for project
  fastify.get('/projects/:id/tasks', {
    schema: projectSchemas.getProjectTasks
  }, async (request, reply) => {
    try {
      const { id } = request.params;
      const { status, priority } = request.query;
      
      const tasks = await dbService.getTasksForProject(parseInt(id), { status, priority });
      reply.send(tasks);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to fetch project tasks' });
    }
  });
}
