import { db } from '../lib/db/index.js';
import { sql } from 'drizzle-orm';

async function runMigrations() {
  try {
    console.log('🚀 Running database migrations...');
    
    // Create all tables
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "USERS" (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(200) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "TAGS" (
        tag VARCHAR(100) PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "PROJECTS" (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        code VARCHAR(10) NOT NULL UNIQUE,
        description TEXT,
        leader_id INTEGER NOT NULL REFERENCES "USERS"(id) ON DELETE RESTRICT,
        next_task_sequence INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "TASKS" (
        id SERIAL PRIMARY KEY,
        project_id INTEGER NOT NULL REFERENCES "PROJECTS"(id) ON DELETE CASCADE,
        task_id VARCHAR(50) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'todo',
        position INTEGER NOT NULL DEFAULT 0,
        story_points INTEGER,
        priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
        assignee_id INTEGER REFERENCES "USERS"(id) ON DELETE SET NULL,
        prompt TEXT,
        is_blocked BOOLEAN DEFAULT false,
        blocked_reason TEXT,
        started_at TIMESTAMP WITH TIME ZONE,
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "TASK_TAGS" (
        task_id INTEGER NOT NULL REFERENCES "TASKS"(id) ON DELETE CASCADE,
        tag VARCHAR(100) NOT NULL REFERENCES "TAGS"(tag) ON DELETE CASCADE
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "IMAGE_METADATA" (
        id SERIAL PRIMARY KEY,
        task_id INTEGER NOT NULL REFERENCES "TASKS"(id) ON DELETE CASCADE,
        original_name VARCHAR(255) NOT NULL,
        content_type VARCHAR(100) NOT NULL,
        file_size INTEGER NOT NULL,
        url VARCHAR(500) NOT NULL,
        storage_type VARCHAR(20) NOT NULL DEFAULT 'local',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "IMAGE_DATA" (
        id INTEGER PRIMARY KEY REFERENCES "IMAGE_METADATA"(id) ON DELETE CASCADE,
        data TEXT NOT NULL,
        thumbnail_data TEXT
      )
    `);

    // Create indexes
    await db.execute(sql`CREATE INDEX IF NOT EXISTS tasks_project_id_idx ON "TASKS"(project_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS tasks_status_idx ON "TASKS"(status)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS tasks_assignee_id_idx ON "TASKS"(assignee_id)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS image_metadata_task_id_idx ON "IMAGE_METADATA"(task_id)`);

    console.log('✅ Database migrations completed successfully!');
  } catch (error) {
    console.error('❌ Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();
