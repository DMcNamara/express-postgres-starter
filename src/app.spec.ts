import request from "supertest";
import { createApp } from "./app";
import { checkDbConnection } from "./db";

jest.mock("./db", () => ({
  checkDbConnection: jest.fn(),
}));

const mockedCheckDbConnection = checkDbConnection as jest.Mock;

describe("GET /heartbeat", () => {
  it("returns 200 and db: up when the database is reachable", async () => {
    mockedCheckDbConnection.mockResolvedValueOnce(undefined);

    const response = await request(createApp()).get("/heartbeat");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: "ok", db: "up" });
    expect(response.body.timestamp).toEqual(expect.any(String));
  });

  it("returns 503 and db: down when the database is unreachable", async () => {
    mockedCheckDbConnection.mockRejectedValueOnce(
      new Error("connection refused"),
    );

    const response = await request(createApp()).get("/heartbeat");

    expect(response.status).toBe(503);
    expect(response.body).toMatchObject({ status: "error", db: "down" });
  });
});
