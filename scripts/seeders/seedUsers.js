import { db } from '../../lib/db/index.js';
import { USERS } from '../../lib/db/schema.js';

export async function seedUsers() {
  console.log('  📝 Seeding users...');
  
  try {
    await db.insert(USERS).values([
      { 
        full_name: 'John Doe', 
        email: 'john.doe@example.com' 
      },
      { 
        full_name: 'Jane Smith', 
        email: 'jane.smith@example.com' 
      },
      { 
        full_name: 'Mike Johnson', 
        email: 'mike.johnson@example.com' 
      },
      { 
        full_name: 'Sarah Wilson', 
        email: 'sarah.wilson@example.com' 
      }
    ]);
    
    console.log('  ✅ Users seeded successfully');
  } catch (error) {
    console.error('  ❌ Error seeding users:', error.message);
    throw error;
  }
}
