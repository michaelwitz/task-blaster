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
      
      const filters = {
        projectId: parseInt(id),
        status,
        priority
      };
      
      const tasks = await dbService.getTasks(filters);
      reply.send(tasks);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to fetch project tasks' });
    }
  });

  // GET /projects/:id/kanban/tasks/column/:status - Get column positions for a specific status
  fastify.get('/projects/:id/kanban/tasks/column/:status', {
    schema: {
      params: {
        type: 'object',
        required: ['id', 'status'],
        properties: {
          id: { type: 'string', pattern: '^\\d+$' },
          status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { id, status } = request.params;
      const projectId = parseInt(id);
      
      const columnTasks = await dbService.getColumnPositions(projectId, status);
      reply.send(columnTasks);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to fetch column positions' });
    }
  });

  // PATCH /projects/:id/kanban/tasks/column/:status/positions - Update multiple task positions in a column
  fastify.patch('/projects/:id/kanban/tasks/column/:status/positions', {
    schema: {
      params: {
        type: 'object',
        required: ['id', 'status'],
        properties: {
          id: { type: 'string', pattern: '^\\d+$' },
          status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] }
        }
      },
      body: {
        type: 'object',
        required: ['positionUpdates'],
        properties: {
          positionUpdates: {
            type: 'array',
            items: {
              type: 'object',
              required: ['taskId', 'newPosition'],
              properties: {
                taskId: { type: 'number' },
                newPosition: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { id, status } = request.params;
      const { positionUpdates } = request.body;
      const projectId = parseInt(id);
      
      const updatedTasks = await dbService.updateColumnPositions(projectId, status, positionUpdates);
      reply.send(updatedTasks);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to update column positions' });
    }
  });

  // PATCH /projects/:id/kanban/tasks/:taskId/position - Update single task position
  fastify.patch('/projects/:id/kanban/tasks/:taskId/position', {
    schema: {
      params: {
        type: 'object',
        required: ['id', 'taskId'],
        properties: {
          id: { type: 'string', pattern: '^\\d+$' },
          taskId: { type: 'string', pattern: '^\\d+$' }
        }
      },
      body: {
        type: 'object',
        required: ['newPosition', 'status'],
        properties: {
          newPosition: { type: 'number' },
          status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { id, taskId } = request.params;
      const { newPosition, status } = request.body;
      const projectId = parseInt(id);
      const taskIdNum = parseInt(taskId);
      
      const updatedTask = await dbService.updateTaskPosition(taskIdNum, newPosition, status);
      reply.send(updatedTask);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to update task position' });
    }
  });
}
