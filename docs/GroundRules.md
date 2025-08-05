# Ground Rules - Task Blaster

## Technology Stack

### Core Requirements

- **Monorepo Structure**: Project uses a monorepo with separate `client` and `api` workspaces
- **JavaScript Only API**: The API is strictly modern JavaScript
- **TypeScript Client**: The client is written in TypeScript and uses Vite as the build tool
- **Node.js Version**: Run on Node.js 22 LTS or higher
- **Frontend**: React.js client with development server
- **Backend**: Latest version of Fastify framework
- **Database**: PostgreSQL version 15 with existing schema and Drizzle ORM
- **Development Philosophy**: API-first development approach
- **API Validation**: All data validation must be enforced at the API level to support future agent communication
- **Database Driven ORM**: Use Drizzle ORM with database driven philosophy for the backend - the Drizzle table definitions (Drizzle kit push) is the source of truth. Do not introduce new API properties that do not exist in the database.

### Architecture

- **Monorepo Structure**: 
  - `api/` - Fastify API server (JavaScript)
  - `client/` - React TypeScript application (Vite)
  - Root workspace manages both with npm workspaces
- **Client-Server Separation**: React client uses development server, Fastify handles API
- **Database**: Reuse existing PostgreSQL schema and Drizzle ORM configuration
- **Containerization**: Docker Compose for database and services
- **Build Tools**:
  - **API**: Node.js native ES modules, no build step required
  - **Client**: Vite for development server and production builds
  - **Development**: Concurrent execution of both services via npm scripts

### Development Standards

- **Structured Logging**: Implement structured logging with Pino
- **Library Management**: Check with project lead before adding any new libraries
- **Styling**: Maintain existing styling libraries (Tailwind CSS, shadcn/ui components)
- **ORM**: Continue using existing Drizzle ORM setup without modification
- **Database Naming Conventions**:
  - Database schema columns use snake_case following SQL conventions
  - JavaScript/JSON API uses camelCase following JavaScript conventions
  - Handle property mapping directly in database queries using Drizzle's select aliases
  - Example: `{ fullName: USERS.full_name, createdAt: USERS.created_at }`
  - All mapping from camel to snake and snake to camel can be handled by the ORM
  - Avoid post-processing property mapping functions for better performance
  - API responses must be in camelCase for consistency
- **Data Formatting Standards**:
  - **Keyword Values**: All keyword/enum values (status, priority, etc.) must use ENUM_CASE format
  - **Status Values**: "TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"
  - **Priority Values**: "LOW", "MEDIUM", "HIGH", "CRITICAL"
  - **Tags**: Exception to ENUM_CASE - tags use lowercase-with-hyphens (kabob-case) format (e.g., "user-management")
  - **Consistency**: All seed data, validation schemas, and API responses must follow these standards
  - **Database Storage**: Keywords stored as ENUM_CASE values in database for consistency
  - **API Validation**: Server-side validation enforces proper keyword formats

### Fastify Best Practices

- **Route Organization**:
  - Use Fastify plugins for route grouping and modularity
  - Implement route prefixes for API versioning (e.g., `/api/v1`)
  - Group related routes in separate plugin files (users, projects, tasks, tags)
  - Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- **Middleware & Hooks**:
  - Use `preHandler` hooks for authentication and authorization
  - Implement `preValidation` hooks for request validation
  - Use `onSend` hooks for response transformation (snake_case to camelCase)
  - Apply CORS middleware for cross-origin requests
- **Schema Validation**:
  - Define JSON schemas for request/response validation
  - Use Fastify's built-in schema validation with `schema` option
  - Implement proper error responses with consistent structure
- **Logging**:
  - Use Fastify's built-in Pino logger instance (`fastify.log`)
  - Log requests with appropriate levels (info, warn, error)
  - Include correlation IDs for request tracking
  - Structure logs with consistent fields (userId, requestId, etc.)
- **Error Handling**:
  - Use Fastify's error handling with `fastify.setErrorHandler()`
  - Return consistent error response format
  - Implement proper HTTP status codes
  - Log errors with full context for debugging

### Port Configuration

- **API Server**: 3030 (Fastify)
- **React Dev Server**: 3001
- **Database**: Use different port from existing Docker containers (avoid port 5432 conflicts)

### Code Quality

- **Error Handling**: Implement proper error handling and validation
- **Testing**: Maintain existing API test coverage
- **Documentation**: Document all API endpoints and functionality
- **Git**: Use conventional commit messages and proper branching
- **API Testing**: Always pipe JSON API responses through `jq` for readable formatting (e.g., `curl ... | jq`)

### Documentation Standards

- **Functional Specifications**: Keep `FunctionalSpecs.md` updated with all new features and capabilities
- **Technical Specifications**: The `ImplementationPlan.md` file contains the technical specifications and implementation details
- **User Documentation Source**: Functional specs serve as the authoritative source for generating user documentation
- **Feature Documentation**: Every new feature must be documented in functional specs before implementation
- **Documentation Review**: Include functional spec updates in all pull requests that add or modify features
- **Version Alignment**: Ensure functional specs accurately reflect the current state of the application

### Essential Development Commands

- **Start Services**:
  - `npm run dev` - Both API and client concurrently
  - `npm run dev:api` - API only (port 3030)
  - `npm run dev:client` - Client only (port 3001)
- **Database Operations**:
  - `npm run db:migrate` - Run database migrations
  - `npm run db:seed` - Seed with test data
  - `npm run db:reset` - Reset and seed database
- **Docker Operations**:
  - `npm run docker:up` - Start PostgreSQL container
  - `npm run docker:down` - Stop containers
- **Build**: `npm run build` - Build client for production

### Development Workflow

- **Git Synchronization**: Before starting any new work, always check git status and sync with main
  - Run `git status` to check current branch and state
  - Switch to main branch: `git checkout main`
  - Pull latest changes: `git pull origin main`
  - This is critical when multiple agents or developers are working on the same repository

### Commit and PR Guidelines

- **Primary Authentication Method**: Use GitHub Personal Access Token (PAT) stored in environment variable `GH_TOKEN`
- **Token Setup Process**:
  1. Create GitHub PAT with `repo`, `workflow`, and `write:packages` scopes
  2. Add to `~/.zshrc`: `export GH_TOKEN=your_token_here`
  3. Reload environment: `source ~/.zshrc`
  4. Verify authentication: `gh auth status`
  5. **Avoid Keychain Conflicts**: Do not store credentials in macOS keychain
  6. Use the token directly in git commands if keychain issues arise:
     - Temporary auth format: `git remote set-url origin https://$GH_TOKEN@github.com/owner/repo.git \&\& git push origin BRANCH \&\& git remote set-url origin https://github.com/owner/repo.git`
- **Feature Branches**: Create a new feature branch for each piece of work (e.g., `feature/add-user-endpoints`)
- **Pull Request Process**: All changes must go through pull requests for review
  - Agent will create feature branches automatically
  - Agent will provide comprehensive PR descriptions when work is complete
  - Agent can create PRs directly on GitHub (with provided access token)
  - Project lead reviews and approves PRs
- **Branch Protection**: Main branch is protected and requires PR approval
- **Commit Standards**: Follow conventional commit format (feat:, fix:, docs:, etc.)

### GitHub Integration Setup

- **Git Repository Configuration**:
  - Keep standard remote format: `https://github.com/owner/repo.git`
  - Verify with: `git remote get-url origin`
- **Recommended Workflow**:
  - Use GitHub CLI for all GitHub operations: `gh pr create`, `gh repo sync`, etc.
  - GitHub CLI automatically uses `GH_TOKEN` for authentication
  - **CRITICAL**: Avoid storing credentials in macOS keychain to prevent conflicts
  - **Always use the environment token** instead of keychain authentication
- **Git Push Authentication** (mandatory when keychain conflicts occur):
  - **Primary method**: `git remote set-url origin https://$GH_TOKEN@github.com/owner/repo.git \&\& git push origin BRANCH \&\& git remote set-url origin https://github.com/owner/repo.git`
  - This temporarily embeds token, pushes, then resets to standard format
  - **This is the preferred approach** to avoid any keychain authentication prompts
- **Standard Commit and PR Process**:
  1. Create feature branch: `git checkout -b feature/your-feature-name`
  2. Make changes and commit: `git add -A \&\& git commit -m "feat: your commit message"`
  3. Push using token method: `git remote set-url origin https://$GH_TOKEN@github.com/owner/repo.git \&\& git push origin feature/your-feature-name \&\& git remote set-url origin https://github.com/owner/repo.git`
  4. Create PR: `gh pr create --title "Your PR title" --body "Your PR description"`
- **Troubleshooting**:
  - Clear keychain conflicts: Remove any github.com entries from Keychain Access
  - Verify token in environment: `echo $GH_TOKEN`
  - Test GitHub CLI: `gh auth status`
  - **Never** rely on keychain for authentication - always use the token

### Migration Strategy

- **Backend**: Complete (JavaScript/Fastify/Drizzle)
- **Frontend**: TypeScript React client with Vite build tool
- **Styling**: Preserve existing Tailwind CSS and shadcn/ui components

## License

- **License Type**: ISC License (already configured in package.json)
