# TEAMTEST

A production-ready boilerplate built with **Next.js**, **React**, **TypeScript**,
**Tailwind CSS**, and deployable on **Vercel** — structured around
**Clean Architecture**.

The sample domain models a **Team** with **TeamMembers**, demonstrating the full
flow from an HTTP entry point down to business rules and back.

---

## Tech Stack

| Concern       | Choice                        |
| ------------- | ----------------------------- |
| Framework     | Next.js 14 (App Router)       |
| UI            | React 18                      |
| Language      | TypeScript (strict)           |
| Styling       | Tailwind CSS                  |
| Deployment    | Vercel                        |
| Lint / Format | ESLint + Prettier             |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

```bash
npm run dev         # start the dev server
npm run build       # production build
npm run start       # run the production build
npm run lint        # ESLint
npm run format      # Prettier write
npm run type-check  # tsc --noEmit
```

### Try the API

```bash
# List members
curl http://localhost:3000/api/team-members

# Create a member
curl -X POST http://localhost:3000/api/team-members \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","role":"owner"}'
```

---

## Deploying to Vercel

Push the repository to Git and import it in Vercel — the framework is detected
automatically (`vercel.json` is included). No build configuration is required.

---

## Clean Architecture

Source code lives under `src/` and is split into four layers. **Dependencies
only ever point inward.**

```
interfaces  →  application  →  domain
infrastructure →  application  →  domain
```

`domain` imports nothing from other layers.

### `src/domain/` — the core

Pure business rules with **zero** knowledge of the outside world. No frameworks,
no I/O, no `process.env`.

- `entities/TeamMember.ts` — entity that protects its own invariants
- `value-objects/Email.ts`, `value-objects/TeamMemberId.ts` — immutable, equality by value
- `repositories/TeamMemberRepository.ts` — a repository **interface** (WHAT, not HOW)
- `services/TeamPolicy.ts` — a domain service spanning multiple entities
- `errors/DomainError.ts` — domain exceptions

### `src/application/` — use cases

Orchestrates domain objects to fulfill use cases. Depends only on `domain`.

- `use-cases/CreateTeamMember.ts` — one class, one `execute(dto)` method, deps injected via constructor
- `use-cases/ListTeamMembers.ts`
- `dto/TeamMemberDTO.ts` — input/output contracts (use cases never leak entities)
- `mappers/TeamMemberMapper.ts` — domain ↔ DTO
- `errors/ApplicationError.ts`

### `src/infrastructure/` — implementations & I/O

Implements the interfaces defined in the inner layers. The only place that reads
`process.env`.

- `persistence/InMemoryTeamMemberRepository.ts` — fulfills the domain repository interface; maps rows ↔ entities
- `config/container.ts` — the **composition root**: the single place that wires concrete implementations to abstractions

> Swap `InMemoryTeamMemberRepository` for a real database adapter and **no other
> layer changes**.

### `src/interfaces/` — entry points / adapters

Translates external input into use case calls and use case output into
responses. Thin, no business logic.

- `http/TeamMemberController.ts` — validate → call use case → serialize; maps errors to HTTP status codes
- `http/validation.ts` — schema/shape validation only (business rules stay in the domain)

### `src/app/` — Next.js framework glue

The outermost boundary. Wires the composition root (`infrastructure`) to the
interfaces controllers and renders/serves them.

- `page.tsx` — server component entry point
- `api/team-members/route.ts` — Route Handlers delegating to the controller
- `layout.tsx`, `globals.css` — shell & Tailwind

### The golden rules

- `domain/` imports **nothing** from other layers.
- `application/` imports only from `domain/`.
- `infrastructure/` implements interfaces defined in `domain`/`application`.
- `interfaces/` orchestrates use cases and never contains business logic.
- Controllers stay thin; use cases return DTOs, never entities.

See the `CLAUDE.md` file in each layer for the full contract.

---

## Path Aliases

```ts
@/*              → src/*
@domain/*        → src/domain/*
@application/*   → src/application/*
@infrastructure/*→ src/infrastructure/*
@interfaces/*    → src/interfaces/*
```
