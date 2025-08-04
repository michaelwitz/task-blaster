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

### Migration Strategy
- **Database Schema**: Direct migration from existing PostgreSQL setup
- **API Endpoints**: Port existing Next.js API routes to Fastify routes
- **Frontend Components**: Convert TypeScript React components to JavaScript/JSX
- **Styling**: Preserve existing Tailwind CSS and component styling

## License
- **License Type**: ISC License (already configured in package.json)
