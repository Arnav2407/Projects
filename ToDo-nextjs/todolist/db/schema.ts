// import { primaryKey } from "drizzle-orm/gel-core";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const tasks = pgTable("tasks",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    completed: boolean("completed").default(false).notNull(), 
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;