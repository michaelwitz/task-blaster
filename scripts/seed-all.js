import { db } from '../lib/db/index.js';
import { USERS, PROJECTS, TASKS, TAGS } from '../lib/db/schema.js';

async function seedAll() {
  try {
    console.log('🌱 Seeding database data...');

    // Insert sample users
    await db.insert(USERS).values([
      { full_name: 'John Doe', email: 'john.doe@example.com' },
      { full_name: 'Jane Smith', email: 'jane.smith@example.com' },
    ]);

    // Insert sample projects
    await db.insert(PROJECTS).values([
      { title: 'Website Redesign', code: 'WEB-RED', leader_id: 1 },
      { title: 'Mobile App Development', code: 'MOB-DEV', leader_id: 2 },
    ]);

    // Insert sample tasks
    await db.insert(TASKS).values([
      { project_id: 1, task_id: 'WEB-1', title: 'Define objectives', status: 'todo' },
      { project_id: 2, task_id: 'DEV-1', title: 'Setup environment', status: 'todo' },
    ]);

    // Insert sample tags
    await db.insert(TAGS).values([
      { tag: 'UI' },
      { tag: 'Backend' },
    ]);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedAll();

