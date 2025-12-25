# CLAUDE.md

Guidelines for Claude Code (claude.ai/code) when working with the Tambo AI monorepo.

**Read @AGENTS.md first.** It owns architecture, naming, workflow rules, testing expectations, and anything code-related. This doc provides a quick reference—defer to AGENTS.md for detailed standards.

## Project Overview

Tambo is an AI-powered React framework for building intelligent UI components. This Turborepo monorepo contains:

- **Tambo Framework** - React SDK, CLI, and supporting packages for developers
- **Tambo Cloud** - Hosted platform with web dashboard and API server

## Repository Structure

### Framework Packages (Published to npm)

| Package | Name | Description |
|---------|------|-------------|
| `react-sdk/` | `@tambo-ai/react` | Core React hooks, providers, and utilities |
| `cli/` | `tambo` | CLI for scaffolding and component generation |
| `create-tambo-app/` | `create-tambo-app` | Project bootstrapper |
| `showcase/` | `@tambo-ai/showcase` | Demo Next.js app (components sync from CLI registry) |
| `docs/` | `@tambo-ai/docs` | Documentation site (Fumadocs) |

### Cloud Platform (Private)

| Package | Name | Description |
|---------|------|-------------|
| `apps/web` | `@tambo-ai-cloud/web` | Next.js web dashboard |
| `apps/api` | `@tambo-ai-cloud/api` | NestJS API server |
| `packages/db` | `@tambo-ai-cloud/db` | Drizzle ORM schema + migrations |
| `packages/core` | `@tambo-ai-cloud/core` | Shared pure utilities (no DB) |
| `packages/backend` | `@tambo-ai-cloud/backend` | LLM/agent helpers |

### Shared Configs

| Package | Purpose |
|---------|---------|
| `packages/eslint-config` | Shared ESLint configuration |
| `packages/typescript-config` | Shared TypeScript configuration |

## Key Commands

```bash
# Development (two different apps!)
npm run dev:cloud        # Start Tambo Cloud (web + API) - ports 3000/3001
npm run dev              # Start React SDK (showcase + docs)

# Quality checks (REQUIRED before commits)
npm run lint             # Lint all packages
npm run check-types      # TypeScript checking
npm test                 # Run all tests

# Individual package work
npm run dev -w cli       # Work on specific package
npm run build -w react-sdk

# Database (requires -w flag)
npm run db:generate -w packages/db  # Generate migrations from schema
npm run db:migrate -w packages/db   # Apply migrations
npm run db:studio -w packages/db    # Open Drizzle Studio

# Docker (for local PostgreSQL)
docker compose --env-file docker.env up postgres -d
```

## Critical Rules for AI Agents

1. **Always run quality checks before commits**: `npm run lint && npm run check-types && npm test`
2. **Read code before modifying it** - understand existing patterns first
3. **Keep changes minimal** - don't over-engineer or add unnecessary abstractions
4. **Follow existing naming conventions** (see AGENTS.md §2):
   - Files: kebab-case
   - Components: `TamboXxx`
   - Hooks: `useTamboXxx`
   - Booleans: `is/has/can/should` prefix
5. **Don't modify tooling configs** (ESLint, TypeScript, etc.) without explicit permission
6. **Add tests for new logic** - unit tests beside the file, integration tests in `__tests__/`
7. **Fail fast, no silent fallbacks** - throw explicit errors instead of hiding failures

## Component Registry

Components in `showcase/src/components/tambo/` are **auto-synced from CLI registry**. To modify showcase components:

1. Edit files in `cli/src/registry/`
2. Run `npm run sync:showcase` (or it syncs automatically on build/dev)

## Tech Stack

- **Frontend**: React 18, Next.js 15, TypeScript 5.9, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, Drizzle ORM, PostgreSQL
- **Build**: Turborepo, npm workspaces
- **Runtime**: Node.js >=22, npm >=11 (Volta for version management)

## PR Requirements

- Title format: `<type>(scope): description` (e.g., `feat(react-sdk): add new hook`)
- Types: `feat`, `fix`, `perf`, `docs`, `style`, `chore`, `refactor`, `test`, `build`, `ci`
- Scopes: `api`, `web`, `core`, `db`, `react-sdk`, `cli`, `showcase`, `docs`

## Documentation Structure

| Document | Purpose |
|----------|---------|
| **AGENTS.md** | Coding standards, architecture (source of truth) |
| **CONTRIBUTING.md** | Dev setup and PR workflow |
| **OPERATORS.md** | Self-hosting/deployment guide |
| **RELEASING.md** | Release workflow |

## Quick Links

- Docs: https://docs.tambo.co
- Discord: https://discord.gg/dJNvPEHth6
- GitHub: https://github.com/tambo-ai/tambo
