    import { NextResponse } from "next/server";
    import { db } from "@/db";
    import { tasks, NewTask } from "@/db/schema";
    import { desc } from "drizzle-orm";

    export async function GET() {
    try {
        const allTasks = await db
        .select()
        .from(tasks)
        .orderBy(desc(tasks.createdAt));

        return NextResponse.json(allTasks);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
        { error: "Failed to fetch tasks" },
        { status: 500 }
        );
    }
    }

    export async function POST(request: Request) {
    try {
        const { title } = await request.json();

        // Better validation
        if (typeof title !== "string" || !title.trim()) {
        return NextResponse.json(
            { error: "Title is required" },
            { status: 400 }
        );
        }

        const newTask: NewTask = {
        title: title.trim(),
        };

        const [created] = await db
        .insert(tasks)
        .values(newTask)
        .returning();

        return NextResponse.json(created, {
        status: 201,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
        { error: "Failed to create task" },
        { status: 500 }
        );
    }
    }