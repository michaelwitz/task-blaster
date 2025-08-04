CREATE TABLE "IMAGE_DATA" (
	"id" integer PRIMARY KEY NOT NULL,
	"data" text NOT NULL,
	"thumbnail_data" text
);
--> statement-breakpoint
CREATE TABLE "IMAGE_METADATA" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" integer NOT NULL,
	"original_name" varchar(255) NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"file_size" integer NOT NULL,
	"url" varchar(500) NOT NULL,
	"storage_type" varchar(20) DEFAULT 'local' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PROJECTS" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"code" varchar(10) NOT NULL,
	"description" text,
	"leader_id" integer NOT NULL,
	"next_task_sequence" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "PROJECTS_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "TAGS" (
	"tag" varchar(100) PRIMARY KEY NOT NULL,
	"color" varchar(7) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TASKS" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"task_id" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'todo' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"story_points" integer,
	"priority" varchar(20) DEFAULT 'Medium' NOT NULL,
	"assignee_id" integer,
	"prompt" text,
	"is_blocked" boolean DEFAULT false,
	"blocked_reason" text,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "TASKS_task_id_unique" UNIQUE("task_id")
);
--> statement-breakpoint
CREATE TABLE "TASK_TAGS" (
	"task_id" integer NOT NULL,
	"tag" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "USERS" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "USERS_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "IMAGE_DATA" ADD CONSTRAINT "IMAGE_DATA_id_IMAGE_METADATA_id_fk" FOREIGN KEY ("id") REFERENCES "public"."IMAGE_METADATA"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "IMAGE_METADATA" ADD CONSTRAINT "IMAGE_METADATA_task_id_TASKS_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."TASKS"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PROJECTS" ADD CONSTRAINT "PROJECTS_leader_id_USERS_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."USERS"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TASKS" ADD CONSTRAINT "TASKS_project_id_PROJECTS_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."PROJECTS"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TASKS" ADD CONSTRAINT "TASKS_assignee_id_USERS_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."USERS"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TASK_TAGS" ADD CONSTRAINT "TASK_TAGS_task_id_TASKS_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."TASKS"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TASK_TAGS" ADD CONSTRAINT "TASK_TAGS_tag_TAGS_tag_fk" FOREIGN KEY ("tag") REFERENCES "public"."TAGS"("tag") ON DELETE cascade ON UPDATE no action;