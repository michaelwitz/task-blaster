/**
 * JSON Schema validation definitions for Task Blaster API
 * Uses Fastify's built-in AJV for maximum performance
 */

// Tag name validation - enforces lowercase, hyphen rules at API level
const tagNamePattern = '^[a-z0-9]+(-[a-z0-9]+)*$';

// Common ID parameter schema
const idParam = {
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9]+$' }
  },
  required: ['id']
};

// Tag schemas
export const tagSchemas = {
  // GET /tags
  getTags: {
    querystring: {
      type: 'object',
      properties: {
        search: { type: 'string', minLength: 1, maxLength: 100 }
      }
    }
  },
  
  // GET /tags/:id
  getTagById: {
    params: idParam
  },
  
  // POST /tags
  createTag: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: tagNamePattern,
          description: 'Tag name must be lowercase with hyphens as separators. Cannot start or end with hyphen.'
        },
        color: {
          type: 'string',
          pattern: '^#[0-9A-Fa-f]{6}$',
          description: 'Color must be a valid hex color (e.g., #FF5733)'
        }
      },
      required: ['name'],
      additionalProperties: false
    }
  },
  
  // PUT /tags/:id
  updateTag: {
    params: idParam,
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: tagNamePattern,
          description: 'Tag name must be lowercase with hyphens as separators. Cannot start or end with hyphen.'
        },
        color: {
          type: 'string',
          pattern: '^#[0-9A-Fa-f]{6}$',
          description: 'Color must be a valid hex color (e.g., #FF5733)'
        }
      },
      additionalProperties: false
    }
  },
  
  // DELETE /tags/:id
  deleteTag: {
    params: idParam
  }
};

// Task schemas
export const taskSchemas = {
  // GET /tasks
  getTasks: {
    querystring: {
      type: 'object',
      properties: {
        projectId: { type: 'string', pattern: '^[0-9]+$' },
        status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
        assigneeId: { type: 'string', pattern: '^[0-9]+$' },
        search: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  },
  
  // GET /tasks/:id
  getTaskById: {
    params: idParam
  },
  
  // POST /tasks
  createTask: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 5000 },
        projectId: { type: 'integer', minimum: 1 },
        status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'], default: 'TO_DO' },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
        dueDate: { type: 'string', format: 'date-time', nullable: true },
        assigneeId: { type: 'integer', minimum: 1, nullable: true },
        position: { type: 'integer', minimum: 0 },
        git_feature_branch: { type: 'string', maxLength: 255 },
        git_pull_request_url: { type: 'string', maxLength: 500 }
      },
      required: ['title', 'projectId'],
      additionalProperties: false
    }
  },
  
  // PUT /tasks/:id
  updateTask: {
    params: idParam,
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 5000 },
        status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
        dueDate: { type: 'string', format: 'date-time', nullable: true },
        assigneeId: { type: 'integer', minimum: 1, nullable: true },
        position: { type: 'integer', minimum: 0 },
        git_feature_branch: { type: 'string', maxLength: 255 },
        git_pull_request_url: { type: 'string', maxLength: 500 }
      },
      additionalProperties: false
    }
  },
  
  // DELETE /tasks/:id
  deleteTask: {
    params: idParam
  },
  
  // PATCH /tasks/:id/reorder
  reorderTask: {
    params: idParam,
    body: {
      type: 'object',
      properties: {
        position: { type: 'integer', minimum: 0 }
      },
      required: ['position'],
      additionalProperties: false
    }
  },
  
  // PUT /tasks/:taskId/tags
  setTaskTags: {
    params: {
      type: 'object',
      properties: {
        taskId: { type: 'string', pattern: '^[0-9]+$' }
      },
      required: ['taskId']
    },
    body: {
      type: 'object',
      properties: {
        tagIds: {
          type: 'array',
          items: { type: 'integer', minimum: 1 },
          uniqueItems: true
        }
      },
      required: ['tagIds'],
      additionalProperties: false
    }
  }
};

// Project schemas
export const projectSchemas = {
  // GET /projects
  getProjects: {
    querystring: {
      type: 'object',
      properties: {
        leaderId: { type: 'string', pattern: '^[0-9]+$' },
        search: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  },
  
  // GET /projects/:id
  getProjectById: {
    params: idParam
  },
  
  // POST /projects
  createProject: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, maxLength: 255 },
        code: { 
          type: 'string', 
          minLength: 2, 
          maxLength: 10,
          pattern: '^[A-Z]+$',
          description: 'Project code must contain only uppercase letters (A-Z), no spaces, numbers, or special characters'
        },
        description: { type: 'string', maxLength: 5000 },
        leaderId: { type: 'integer', minimum: 1 }
      },
      required: ['title', 'code', 'leaderId'],
      additionalProperties: false
    }
  },
  
  // PUT /projects/:id - Project codes are immutable, only title, description, and leaderId can be updated
  updateProject: {
    params: idParam,
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 5000 },
        leaderId: { type: 'integer', minimum: 1 }
      },
      additionalProperties: false
    }
  },
  
  // DELETE /projects/:id
  deleteProject: {
    params: idParam
  },
  
  // GET /projects/:id/tasks
  getProjectTasks: {
    params: idParam,
    querystring: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] }
      }
    }
  }
};

// User schemas
export const userSchemas = {
  // GET /users
  getUsers: {
    querystring: {
      type: 'object',
      properties: {
        search: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  },
  
  // GET /users/:id
  getUserById: {
    params: idParam
  },
  
  // POST /users
  createUser: {
    body: {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 3, maxLength: 50 },
        email: { type: 'string', format: 'email', maxLength: 255 },
        firstName: { type: 'string', minLength: 1, maxLength: 100 },
        lastName: { type: 'string', minLength: 1, maxLength: 100 }
      },
      required: ['username', 'email', 'firstName', 'lastName'],
      additionalProperties: false
    }
  },
  
  // PUT /users/:id
  updateUser: {
    params: idParam,
    body: {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 3, maxLength: 50 },
        email: { type: 'string', format: 'email', maxLength: 255 },
        firstName: { type: 'string', minLength: 1, maxLength: 100 },
        lastName: { type: 'string', minLength: 1, maxLength: 100 }
      },
      additionalProperties: false
    }
  },
  
  // DELETE /users/:id
  deleteUser: {
    params: idParam
  }
};

// Common response schemas
export const responseSchemas = {
  error: {
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
      statusCode: { type: 'integer' }
    }
  },
  
  success: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: { type: 'object' }
    }
  }
};
