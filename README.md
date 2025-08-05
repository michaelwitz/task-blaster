# Task Blaster - Kanban Orchestration App

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

A modern Kanban-style task management application built as a monorepo with a Fastify API backend and React TypeScript frontend.

> ✅ **Status**: Fully tested and working - API, database, and Docker setup confirmed operational.

## 🏗️ Architecture

This is a **monorepo** containing:

- **API** (`api/`): Fastify Node.js server with PostgreSQL and Drizzle ORM
- **Client** (`client/`): React TypeScript application with Vite build tool
- **Database**: PostgreSQL 15 with Docker containerization

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ LTS
- Docker and Docker Compose
- npm (comes with Node.js)

### Development Setup

1. **Clone and Install**
```bash
git clone https://github.com/michaelwitz/task-blaster.git
cd task-blaster
npm install
```

2. **Start Database**
```bash
npm run docker:up:db
```

3. **Setup Database Schema**
```bash
npm run db:migrate
npm run db:seed
```

4. **Start Development Servers**
```bash
npm run dev
```

This starts both API (port 3030) and Client (port 3001) concurrently.

### Alternative: Full Docker Development

```bash
# Start all services in Docker
npm run docker:up

# View logs
npm run docker:logs

# Stop services  
npm run docker:down
```

## 📁 Project Structure

```
task-blaster/
├── api/                    # Fastify API server
│   ├── src/               # API source code
│   ├── lib/db/            # Database schema and migrations
│   ├── scripts/           # Database utilities
│   └── Dockerfile         # API production build
├── client/                # React TypeScript app
│   ├── src/               # Client source code
│   ├── Dockerfile         # Production build (Nginx)
│   └── Dockerfile.dev     # Development build
├── docs/                  # Project documentation
├── docker-compose.yml     # Development environment
├── docker-compose.prod.yml # Production environment
└── package.json          # Monorepo workspace config
```

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start both API and client concurrently
- `npm run dev:api` - Start API server only (port 3030)
- `npm run dev:client` - Start client only (port 3001)

### Database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data
- `npm run db:reset` - Reset and reseed database

### Docker
- `npm run docker:up` - Start all services (dev mode)
- `npm run docker:down` - Stop all services
- `npm run docker:up:db` - Start database only
- `npm run docker:logs` - View container logs

### Production
- `npm run build` - Build client for production
- `npm run docker:prod:build` - Build production containers
- `npm run docker:prod:up` - Start production stack

## 🔧 Technology Stack

### Backend (API)
- **Runtime**: Node.js 22+ LTS
- **Framework**: Fastify (latest)
- **Database**: PostgreSQL 15
- **ORM**: Drizzle ORM
- **Language**: JavaScript (ES modules)

### Frontend (Client)  
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Dev Server**: Vite dev server

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15 in Docker
- **Development**: Hot reload for both API and client
- **Production**: Multi-stage Docker builds with Nginx

## 🌐 API Endpoints

The API runs on `http://localhost:3030` and provides:

- `GET /health` - Health check
- `GET /api/users` - User management
- `GET /api/projects` - Project management  
- `GET /api/tasks` - Task management
- `GET /api/tags` - Tag management

See the API documentation in `api/` for detailed endpoint information.

## 🐳 Docker Configuration

The project includes comprehensive Docker support:

- **Development**: Hot reload, volume mounting, service dependencies
- **Production**: Multi-stage builds, Nginx for static assets, restart policies

See [DOCKER.md](DOCKER.md) for detailed Docker documentation.

## 📚 Documentation

- [Ground Rules](docs/GroundRules.md) - Development standards and conventions
- [Functional Specs](docs/FunctionalSpecs.md) - Feature specifications
- [Implementation Plan](docs/ImplementationPlan.md) - Technical implementation details
- [Docker Setup](DOCKER.md) - Docker configuration and usage

## 🤝 Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with conventional format: `git commit -m "feat: your feature"`
4. Push and create pull request
5. All changes require PR approval before merging to main

## 📋 Features

### Current
- ✅ Fastify API with PostgreSQL database
- ✅ React TypeScript client with Vite
- ✅ Docker containerization for all services
- ✅ Database migrations and seeding
- ✅ Monorepo workspace configuration
- ✅ Concurrent development servers
- ✅ Production-ready Docker builds

### Planned
- 🔄 UI migration from Next.js components
- 🔄 State management implementation
- 🔄 API integration and data fetching
- 🔄 Kanban board functionality
- 🔄 Authentication and authorization

## 📝 License

ISC License - see package.json for details.

## 👨‍💻 Author

Michael Woytowitz

---

For detailed setup instructions and development guidelines, see the documentation in the `docs/` folder.
