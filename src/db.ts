import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5433/app",
});

// pg's Pool emits "error" for problems on idle clients (e.g. the database
// restarts or drops the connection). Without a listener, Node treats that
// as an unhandled error and crashes the process.
pool.on("error", (err) => {
  console.error("Unexpected error on idle Postgres client", err);
});

/**
 * Runs a trivial query against Postgres to confirm the connection is alive.
 * Used by the heartbeat endpoint.
 */
export async function checkDbConnection(): Promise<void> {
  await pool.query("SELECT 1");
}
