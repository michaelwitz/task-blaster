# Ground Rules - Task Blaster

## Technology Stack

### Core Requirements
- **JavaScript Only**: Use only JavaScript and JSX - no TypeScript
- **Node.js Version**: Run on Node.js 22 LTS or higher
- **Frontend**: React.js client with development server
- **Backend**: Latest version of Fastify framework
- **Database**: PostgreSQL with existing schema and Drizzle ORM
- **Development Philosophy**: API-first development approach

### Architecture
- **Client-Server Separation**: React client uses development server, Fastify handles API
- **Database**: Reuse existing PostgreSQL schema and Drizzle ORM configuration
- **Containerization**: Docker Compose for database and services

### Development Standards
- **Structured Logging**: Implement structured logging with Pino
- **Library Management**: Check with project lead before adding any new libraries
- **Styling**: Maintain existing styling libraries (Tailwind CSS, shadcn/ui components)
- **ORM**: Continue using existing Drizzle ORM setup without modification

### Port Configuration
- **API Server**: 3030 (Fastify)
- **React Dev Server**: 3001
- **Database**: Use different port from existing Docker containers (avoid port 5432 conflicts)

### Code Quality
- **Error Handling**: Implement proper error handling and validation
- **Testing**: Maintain existing API test coverage
- **Documentation**: Document all API endpoints and functionality
- **Git**: Use conventional commit messages and proper branching

### Development Workflow
- **Git Synchronization**: Before starting any new work, always check git status and sync with main
  - Run `git status` to check current branch and state
  - Switch to main branch: `git checkout main`
  - Pull latest changes: `git pull origin main`
  - This is critical when multiple agents or developers are working on the same repository
- **Feature Branches**: Create a new feature branch for each piece of work (e.g., `feature/add-user-endpoints`)
- **Pull Request Process**: All changes must go through pull requests for review
  - Agent will create feature branches automatically
  - Agent will provide comprehensive PR descriptions when work is complete
  - Agent can create PRs directly on GitHub (with provided access token)
  - Project lead reviews and approves PRs
- **Branch Protection**: Main branch is protected and requires PR approval
- **Commit Standards**: Follow conventional commit format (feat:, fix:, docs:, etc.)

### GitHub Integration Setup
- **Access Token**: GitHub Personal Access Token (PAT) is stored in environment variable `GH_TOKEN`
- **Token Permissions**: Classic PAT requires `repo`, `workflow`, and `write:packages` scopes
- **Persistent Storage**: Token is stored in `~/.zshrc` for persistence across terminal sessions
  - Add line: `export GH_TOKEN=your_token_here`
  - Reload with: `source ~/.zshrc`
- **Git Remote Configuration**: Always use standard HTTPS format
  - Correct format: `https://github.com/owner/repo.git`
  - Verify with: `git remote get-url origin`
  - Reset if needed: `git remote set-url origin https://github.com/owner/repo.git`
- **GitHub CLI**: Uses `gh` command for PR creation and repository operations
  - GitHub CLI handles authentication automatically via `GH_TOKEN`
  - Never embed tokens directly in git remote URLs
- **Authentication Verification**: Run `gh auth status` to verify token is working
- **Repository Access**: Agent can create PRs, push branches, and manage repository via GitHub API
- **Troubleshooting**: If git push fails, verify remote URL format and GH_TOKEN environment variable

### Migration Strategy
- **Database Schema**: Direct migration from existing PostgreSQL setup
- **API Endpoints**: Port existing Next.js API routes to Fastify routes
- **Frontend Components**: Convert TypeScript React components to JavaScript/JSX
- **Styling**: Preserve existing Tailwind CSS and component styling

## License
- **License Type**: ISC License (already configured in package.json)
