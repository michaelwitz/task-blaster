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
- **Primary Authentication Method**: Use GitHub Personal Access Token (PAT) stored in environment variable `GH_TOKEN`
- **Token Setup Process**:
  1. Create GitHub PAT with `repo`, `workflow`, and `write:packages` scopes
  2. Add to `~/.zshrc`: `export GH_TOKEN=your_token_here`
  3. Reload environment: `source ~/.zshrc`
  4. Verify authentication: `gh auth status`
- **Git Repository Configuration**:
  - Keep standard remote format: `https://github.com/owner/repo.git`
  - Verify with: `git remote get-url origin`
- **Recommended Workflow**:
  - Use GitHub CLI for all GitHub operations: `gh pr create`, `gh repo sync`, etc.
  - GitHub CLI automatically uses `GH_TOKEN` for authentication
  - Avoid storing credentials in macOS keychain to prevent conflicts
- **Git Push Authentication** (when keychain conflicts occur):
  - Backup method: `git remote set-url origin https://$GH_TOKEN@github.com/owner/repo.git && git push origin BRANCH && git remote set-url origin https://github.com/owner/repo.git`
  - This temporarily embeds token, pushes, then resets to standard format
- **Troubleshooting**:
  - Clear keychain conflicts: Remove any github.com entries from Keychain Access
  - Verify token in environment: `echo $GH_TOKEN`
  - Test GitHub CLI: `gh auth status`

### Migration Strategy
- **Database Schema**: Direct migration from existing PostgreSQL setup
- **API Endpoints**: Port existing Next.js API routes to Fastify routes
- **Frontend Components**: Convert TypeScript React components to JavaScript/JSX
- **Styling**: Preserve existing Tailwind CSS and component styling

## License
- **License Type**: ISC License (already configured in package.json)
