# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project Overview

This project is a finances tracker that allows me to upload my bank statements as a CSV file and track my expenses and income. This repository is for the UI.

# Tech Stack

- Vite
- Pnpm
- React
- TypeScript
- ShadCN
- TailwindCSS
- TanStack (Router, React Query, React Table)

# Commands

- `pnpm dev` — start the dev server
- `pnpm build` — type-check and build
- `pnpm test` — run all tests
- `pnpm test src/components/foo/foo.test.tsx` — run a single test file
- `pnpm lint` — lint the codebase
- `pnpm format` — format with Prettier

# Architecture

- `/src/api` — Axios client (`baseURL: http://localhost:8080`) and typed fetch functions. `Transaction.amount` is stored in pennies (e.g. `15420` = £154.20). Default currency is GBP.
- `/src/hooks` — React Query hooks (e.g. `useTransactions`) that wrap API calls; components should fetch data through these hooks, not directly.
- `/src/components` — UI components. ShadCN primitives live in `ui/`, feature components each get their own folder.
- `/src/pages` — Page-level components rendered by the router.
- `/src/router.tsx` — TanStack Router tree. `RootLayout` wraps all routes; page routes are children.

Data flow: `page → hook (React Query) → api fn → axios client → backend`

Path alias: `@` resolves to `./src` (configured in `vite.config.ts` and `tsconfig`).

The app always runs in dark mode (`<html class="dark">`).

# Code Conventions

- Ensure type safety
- Avoid using `any`
- Prefer `interface` over `type`
- Prefer `const` over `let`
- Avoid comments
- Favour ShadCN components over custom components
- Create a new folder for each component
- Avoid using relative position

# Security

- Never version control sensitive keys, API keys, or secrets

# Testing

- Test components with unit tests using Vitest + Testing Library (jsdom environment, globals enabled)
- Avoid useless tests
- Avoid multiple asserts in a single test
