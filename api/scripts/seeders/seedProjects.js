import { db } from '../../lib/db/index.js';
import { PROJECTS } from '../../lib/db/schema.js';

export async function seedProjects() {
  console.log('  📝 Seeding projects...');
  
  try {
    await db.insert(PROJECTS).values([
      { 
        title: 'Website Redesign', 
        code: 'WEBRED', 
        description: 'Complete overhaul of company website with modern design',
        leader_id: 1 
      },
      { 
        title: 'Mobile App Development', 
        code: 'MOBDEV', 
        description: 'Native mobile app for iOS and Android platforms',
        leader_id: 2 
      },
      { 
        title: 'API Modernization', 
        code: 'APIMOD', 
        description: 'Migrate legacy APIs to modern REST architecture',
        leader_id: 3 
      }
    ]);
    
    console.log('  ✅ Projects seeded successfully');
  } catch (error) {
    console.error('  ❌ Error seeding projects:', error.message);
    throw error;
  }
}
