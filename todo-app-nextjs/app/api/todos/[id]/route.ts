import { NextResponse } from 'next/server';
import { updateTodo, deleteTodo } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { completed } = await req.json();
  const todo = await updateTodo(Number(id), completed);
  return NextResponse.json(todo);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteTodo(Number(id));
  return NextResponse.json({ success: true });
}
