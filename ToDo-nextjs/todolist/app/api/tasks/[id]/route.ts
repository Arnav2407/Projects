import { NextResponse } from "next/server"; 
import { db } from "@/db"; 
import { tasks } from "@/db/schema"; 
import { eq } from "drizzle-orm";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string}}
){
    try{
        const id = Number(params.id);
        const{ completed } = await request.json();
        const [updated] = await db
    .update(tasks)
    .set({ completed }) // SET completed = ?
    .where(eq(tasks.id, id)) // WHERE id = ?
    .returning();
    if (!updated) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
    } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update task" }, { status:
    500 });
    }
    }
    // Handles DELETE /api/tasks/:id
    // Deletes a task by ID
    export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
    ) {
    try {
    const id = Number(params.id);
    const [deleted] = await db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning();
    if (!deleted) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete task" }, { status:
    500 });
    }}