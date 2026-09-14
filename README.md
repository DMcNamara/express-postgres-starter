# express-postgres-starter

A starter template for Node.js + TypeScript services using Express, with
Postgres running in Docker.

## Requirements

- Node.js 24+
- Docker (for Postgres)

## Getting started

```bash
npm install
cp .env.example .env
npm run db:up      # starts Postgres in Docker (docker compose)
npm start          # builds and runs the server on http://localhost:3000
```

Check it's alive:

```bash
curl http://localhost:3000/heartbeat
```

`GET /heartbeat` returns `200` with `{ status: "ok", db: "up" }` when the
server can reach Postgres, or `503` with `{ status: "error", db: "down" }`
otherwise.

## Scripts

| Script               | Description                                     |
| -------------------- | ------------------------------------------------ |
| `npm run build`      | Compile TypeScript to `dist/`                    |
| `npm start`          | Build, then run the compiled server              |
| `npm run dev`        | Run the server from source with `ts-node`, reloading on file changes |
| `npm test`           | Run tests with Jest via `ts-jest` (no separate compile step) |
| `npm run test:watch` | Rerun tests on every change                      |
| `npm run lint`       | Lint the project with ESLint                     |
| `npm run lint:fix`   | Lint and auto-fix what ESLint can fix             |
| `npm run db:up`      | Start Postgres via Docker Compose                |
| `npm run db:down`    | Stop Postgres                                    |

## Notes

- Tests mock the database layer (`src/db.ts`), so `npm test` does not require
  Postgres to be running.
- This project pins TypeScript to the 6.x line (rather than TypeScript 7's
  native compiler) so `ts-jest` and `ts-node` can use the JS compiler API,
  keeping the test/dev loop on TypeScript source directly instead of a
  separate `tsc` precompile step.
- Postgres data persists in a named Docker volume (`pgdata`) across restarts.
