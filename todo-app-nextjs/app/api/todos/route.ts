import { NextResponse } from 'next/server';
import { getTodos, createTodo, initDB } from '@/lib/db';

export async function GET() {
  await initDB();
  const todos = await getTodos();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
  const todo = await createTodo(title.trim());
  return NextResponse.json(todo, { status: 201 });
}
