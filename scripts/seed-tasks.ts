import { dbService } from '../lib/db/service'
import { db } from '../lib/db'
import { PROJECTS } from '../lib/db/schema'
import type { Priority } from '../types'

async function seedTasks() {
  try {
    console.log('Seeding tasks...')
    
    // Get all users and projects
    const users = await dbService.getUsers()
    const projects = await db.select({ id: PROJECTS.id, title: PROJECTS.title }).from(PROJECTS).orderBy(PROJECTS.id)
    
    if (users.length === 0) {
      console.log('No users found. Please run seed-users.ts first.')
      return
    }
    
    if (projects.length === 0) {
      console.log('No projects found. Please run seed-projects.ts first.')
      return
    }

    const tasks = [
      // Website Redesign Project (Project 1)
      {
        projectId: projects[0].id,
        title: 'Design Homepage Mockup',
        status: 'todo',
        priority: 'High',
        assigneeId: users[1].id as number, // Jane Smith
        storyPoints: 8,
        prompt: 'Create wireframes and mockups for the new homepage design. Focus on user experience and modern design principles.',
        tags: ['design', 'frontend', 'ux']
      },
      {
        projectId: projects[0].id,
        title: 'Implement Responsive Layout',
        status: 'in-progress',
        priority: 'High',
        assigneeId: users[0].id as number, // John Doe
        storyPoints: 13,
        prompt: 'Build the responsive layout using CSS Grid and Flexbox. Ensure compatibility across all devices.',
        tags: ['frontend', 'css', 'responsive']
      },
      {
        projectId: projects[0].id,
        title: 'Optimize Images and Assets',
        status: 'in-review',
        priority: 'Medium',
        assigneeId: users[2].id as number, // Bob Johnson
        storyPoints: 5,
        prompt: 'Compress and optimize all images for web. Implement lazy loading for better performance.',
        tags: ['performance', 'optimization']
      },
      {
        projectId: projects[0].id,
        title: 'Write Documentation',
        status: 'done',
        priority: 'Low',
        assigneeId: users[3].id as number, // Alice Williams
        storyPoints: 3,
        prompt: 'Create comprehensive documentation for the new website design and implementation.',
        tags: ['documentation']
      },

      // Mobile App Development Project (Project 2)
      {
        projectId: projects[1].id,
        title: 'Set up React Native Project',
        status: 'done',
        priority: 'High',
        assigneeId: users[1].id as number, // Jane Smith
        storyPoints: 5,
        prompt: 'Initialize React Native project with TypeScript and configure development environment.',
        tags: ['mobile', 'react-native', 'setup']
      },
      {
        projectId: projects[1].id,
        title: 'Design App Navigation',
        status: 'in-progress',
        priority: 'High',
        assigneeId: users[0].id as number, // John Doe
        storyPoints: 8,
        prompt: 'Implement bottom tab navigation and stack navigation for different app screens.',
        tags: ['mobile', 'navigation', 'ui']
      },
      {
        projectId: projects[1].id,
        title: 'Integrate API Endpoints',
        status: 'todo',
        priority: 'Medium',
        assigneeId: users[2].id as number, // Bob Johnson
        storyPoints: 13,
        prompt: 'Connect the mobile app to backend API endpoints for data fetching and user authentication.',
        tags: ['api', 'integration', 'backend']
      },
      {
        projectId: projects[1].id,
        title: 'Test on iOS Simulator',
        status: 'todo',
        priority: 'Medium',
        assigneeId: users[4].id as number, // Charlie Brown
        storyPoints: 5,
        prompt: 'Run comprehensive tests on iOS simulator to ensure app functionality and UI consistency.',
        tags: ['testing', 'ios', 'qa']
      },

      // Database Migration Project (Project 3)
      {
        projectId: projects[2].id,
        title: 'Backup Current Database',
        status: 'done',
        priority: 'Critical',
        assigneeId: users[2].id as number, // Bob Johnson
        storyPoints: 3,
        prompt: 'Create full backup of current database before migration. Verify backup integrity.',
        tags: ['database', 'backup', 'migration']
      },
      {
        projectId: projects[2].id,
        title: 'Create Migration Scripts',
        status: 'in-progress',
        priority: 'High',
        assigneeId: users[2].id as number, // Bob Johnson
        storyPoints: 21,
        prompt: 'Write SQL migration scripts to transform current schema to new structure. Include rollback procedures.',
        tags: ['database', 'migration', 'sql']
      },
      {
        projectId: projects[2].id,
        title: 'Test Migration Process',
        status: 'todo',
        priority: 'High',
        assigneeId: users[3].id as number, // Alice Williams
        storyPoints: 8,
        prompt: 'Test migration process on staging environment. Verify data integrity and performance.',
        tags: ['testing', 'migration', 'staging']
      },

      // API Integration Project (Project 4)
      {
        projectId: projects[3].id,
        title: 'Research Third-party APIs',
        status: 'done',
        priority: 'Medium',
        assigneeId: users[3].id as number, // Alice Williams
        storyPoints: 5,
        prompt: 'Research and evaluate third-party APIs for payment processing and email services.',
        tags: ['research', 'api', 'integration']
      },
      {
        projectId: projects[3].id,
        title: 'Implement Payment Gateway',
        status: 'in-progress',
        priority: 'High',
        assigneeId: users[0].id as number, // John Doe
        storyPoints: 13,
        prompt: 'Integrate Stripe payment gateway for processing online payments securely.',
        tags: ['payment', 'stripe', 'security']
      },
      {
        projectId: projects[3].id,
        title: 'Set up Email Service',
        status: 'todo',
        priority: 'Medium',
        assigneeId: users[1].id as number, // Jane Smith
        storyPoints: 8,
        prompt: 'Configure SendGrid for transactional emails and marketing campaigns.',
        tags: ['email', 'sendgrid', 'marketing']
      },

      // Security Audit Project (Project 5)
      {
        projectId: projects[4].id,
        title: 'Vulnerability Assessment',
        status: 'in-progress',
        priority: 'Critical',
        assigneeId: users[4].id as number, // Charlie Brown
        storyPoints: 21,
        prompt: 'Conduct comprehensive security audit of all systems and identify potential vulnerabilities.',
        tags: ['security', 'audit', 'vulnerability']
      },
      {
        projectId: projects[4].id,
        title: 'Update Security Policies',
        status: 'todo',
        priority: 'High',
        assigneeId: users[4].id as number, // Charlie Brown
        storyPoints: 8,
        prompt: 'Review and update security policies and procedures based on audit findings.',
        tags: ['security', 'policies', 'compliance']
      },
      {
        projectId: projects[4].id,
        title: 'Implement Security Fixes',
        status: 'todo',
        priority: 'Critical',
        assigneeId: users[2].id as number, // Bob Johnson
        storyPoints: 13,
        prompt: 'Implement security patches and fixes for identified vulnerabilities.',
        tags: ['security', 'patches', 'fixes']
      }
    ]

    for (const task of tasks) {
      const createdTask = await dbService.createTask(task.projectId, {
        title: task.title,
        status: task.status,
        priority: task.priority as Priority,
        assigneeId: task.assigneeId,
        storyPoints: task.storyPoints,
        prompt: task.prompt,
        tags: task.tags
      })
      console.log(`Created task: ${createdTask.title} (Project: ${projects.find(p => p.id === task.projectId)?.title})`)
    }

    console.log('Task seeding completed!')
  } catch (error) {
    console.error('Error seeding tasks:', error)
  }
}

seedTasks() 