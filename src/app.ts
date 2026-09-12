import express, { Express, Request, Response } from "express";
import { checkDbConnection } from "./db";

export function createApp(): Express {
  const app = express();

  app.get("/heartbeat", async (_req: Request, res: Response) => {
    try {
      await checkDbConnection();
      res.status(200).json({
        status: "ok",
        db: "up",
        timestamp: new Date().toISOString(),
      });
    } catch {
      res.status(503).json({
        status: "error",
        db: "down",
        timestamp: new Date().toISOString(),
      });
    }
  });

  return app;
}
