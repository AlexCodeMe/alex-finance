import { z } from "zod";
import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";

const app = new Hono()
  .get("/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));

      return c.json({ data });
    }
  )
  .get("/:id",
    zValidator("param", z.object({
      id: z.string().optional(),
    })),
    clerkMiddleware(),
    async (c) => {
    const auth = getAuth(c);

    const { id } = c.req.valid("param");

    if (!id) {
      throw new HTTPException(400, {
        res: c.json({ error: "Bad request" }, 400),
      });
    }

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const [data] = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, auth.userId),
          eq(accounts.id, id),
        ),
      );

    if (!data) {
      throw new HTTPException(404, {
        res: c.json({ error: "Not found" }, 404),
      });
    }
      
    return c.json({ data });
  })
  .post("/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ 
      name: true
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }


      const data = await db.insert(accounts).values({
        id: createId(),
        userId: auth.userId,
        ...values,
      }).returning();

      return c.json({ data });
    },
  )
  .post("/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids),
          )
        )
        .returning({
          id: accounts.id,
        });

      return c.json({ data });
    },
  )
  .patch("/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      }),
    ),
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      if (!id) {
        throw new HTTPException(400, {
          res: c.json({ error: "Bad request" }, 400),
        });
      }

      const [data] = await db
        .update(accounts)
        .set(values)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id),
          ),
        )
        .returning();

      if (!data) {
        throw new HTTPException(404, {
          res: c.json({ error: "Not found" }, 404),
        });
      }

      return c.json({ data });
    },
  )
  .delete("/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      if (!id) {
        throw new HTTPException(400, {
          res: c.json({ error: "Bad request" }, 400),
        });
      }

      const [data] = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id),
          ),
        )
        .returning({
          id: accounts.id,
        });

      if (!data) {
        throw new HTTPException(404, {
          res: c.json({ error: "Not found" }, 404),
        });
      }

      return c.json({ data });
    },
  );

export default app;
