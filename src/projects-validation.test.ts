import { describe, expect, test } from "vitest";
import { buildApp } from "./app.js";

describe("project config validation (zod)", () => {
  test("accepts valid nested config and strips unknown top-level keys", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/projects",
      payload: { name: "Acme", config: { retries: 3 }, extra: "should-be-stripped" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ name: "Acme", config: { retries: 3 } });
  });

  test("rejects invalid project payloads", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/projects",
      payload: { name: 123 },
    });
    expect(res.statusCode).toBe(500);
  });
});
