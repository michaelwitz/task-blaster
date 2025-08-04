import { seedUsers } from './seeders/seedUsers.js';
import { seedProjects } from './seeders/seedProjects.js';
import { seedTags } from './seeders/seedTags.js';
import { seedTasks } from './seeders/seedTasks.js';
import { seedTaskTags } from './seeders/seedTaskTags.js';

async function seedAll() {
  try {
    console.log('🌱 Seeding database data in correct order...');
    console.log('');

    // Step 1: Seed independent tables first (no foreign keys)
    console.log('📋 Step 1: Seeding base entities...');
    await seedUsers();
    await seedTags();
    console.log('');

    // Step 2: Seed tables that depend on users
    console.log('📋 Step 2: Seeding projects (depends on users)...');
    await seedProjects();
    console.log('');

    // Step 3: Seed tables that depend on projects and users
    console.log('📋 Step 3: Seeding tasks (depends on projects and users)...');
    await seedTasks();
    console.log('');

    // Step 4: Seed relationship tables
    console.log('📋 Step 4: Seeding relationships (depends on tasks and tags)...');
    await seedTaskTags();
    console.log('');

    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   • 4 users created');
    console.log('   • 3 projects created');
    console.log('   • 6 tags created');
    console.log('   • 5 tasks created');
    console.log('   • 10 task-tag relationships created');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    console.error('🔍 Full error:', error);
    process.exit(1);
  }
}

seedAll();

