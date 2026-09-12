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

| Script               | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run build`      | Compile TypeScript to `dist/`                        |
| `npm start`          | Build, then run the compiled server                  |
| `npm test`           | Compile tests to `dist-test/` and run them with Jest |
| `npm run test:watch` | Watch TypeScript + rerun tests on every change       |
| `npm run db:up`      | Start Postgres via Docker Compose                    |
| `npm run db:down`    | Stop Postgres                                        |

## Notes

- Tests mock the database layer (`src/db.ts`), so `npm test` does not require
  Postgres to be running.
- This project intentionally avoids `ts-jest`/`ts-node`: TypeScript 7's
  native compiler doesn't expose the JS compiler API those tools rely on.
  Instead, TypeScript compiles to plain JS (via `tsc`) and Jest/Node run the
  output directly.
- Postgres data persists in a named Docker volume (`pgdata`) across restarts.
