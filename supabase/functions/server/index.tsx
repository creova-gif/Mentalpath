import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import trialManager from "./trial-manager.ts";
import aiRoutes from "./ai-routes.ts";
import billingRoutes from "./billing-routes.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-4d1a502d/health", (c) => {
  return c.json({ status: "ok" });
});

// Mount trial manager routes
app.route("/", trialManager);

// Mount AI note assist routes
app.route("/", aiRoutes);

// Mount billing routes
app.route("/", billingRoutes);

Deno.serve(app.fetch);