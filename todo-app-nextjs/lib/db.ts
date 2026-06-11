import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function getTodos() {
  return await sql`SELECT * FROM todos ORDER BY created_at DESC`;
}

export async function createTodo(title: string) {
  const result = await sql`
    INSERT INTO todos (title) VALUES (${title}) RETURNING *
  `;
  return result[0];
}

export async function updateTodo(id: number, completed: boolean) {
  const result = await sql`
    UPDATE todos SET completed = ${completed} WHERE id = ${id} RETURNING *
  `;
  return result[0];
}

export async function deleteTodo(id: number) {
  await sql`DELETE FROM todos WHERE id = ${id}`;
}
