import { drizzle } from 'drizzle-orm/better-sqlite3';
import { publicProcedure, router } from './trpc';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { todos } from '@/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });

export const appRouter = router({
  // resolvers
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (options) => {
    await db.insert(todos).values({ content: options.input, done: 0 }).run();
    return true;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      })
    )
    .mutation(async (options) => {
      await db
        .update(todos)
        .set({ done: options.input.done })
        .where(eq(todos.id, options.input.id))
        .run();
      return true;
    }),
});

export type AppRouter = typeof appRouter;
