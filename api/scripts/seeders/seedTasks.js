import { db } from '../../lib/db/index.js';
import { TASKS } from '../../lib/db/schema.js';

export async function seedTasks() {
  console.log('  📝 Seeding tasks...');
  
  try {
    await db.insert(TASKS).values([
      { 
        project_id: 1, 
        task_id: 'WEBRED-1', 
        title: 'Design mockups for homepage', 
        prompt: 'Create wireframes and high-fidelity designs for the new homepage',
        status: 'TO_DO',
        priority: 'HIGH',
        assignee_id: 2,
        position: 1
      },
      { 
        project_id: 1, 
        task_id: 'WEBRED-2', 
        title: 'Implement responsive navigation', 
        prompt: 'Build mobile-first navigation component',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        assignee_id: 1,
        position: 2
      },
      { 
        project_id: 2, 
        task_id: 'MOBDEV-1', 
        title: 'Setup React Native environment', 
        prompt: 'Configure development environment for React Native',
        status: 'DONE',
        priority: 'HIGH',
        assignee_id: 3,
        position: 1
      },
      { 
        project_id: 2, 
        task_id: 'MOBDEV-2', 
        title: 'Create authentication screens', 
        prompt: 'Build login and registration screens',
        status: 'TO_DO',
        priority: 'MEDIUM',
        assignee_id: 2,
        position: 2
      },
      { 
        project_id: 3, 
        task_id: 'APIMOD-1', 
        title: 'Audit existing API endpoints', 
        prompt: 'Document and analyze current API structure',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assignee_id: 4,
        position: 1
      }
    ]);
    
    console.log('  ✅ Tasks seeded successfully');
  } catch (error) {
    console.error('  ❌ Error seeding tasks:', error.message);
    throw error;
  }
}
