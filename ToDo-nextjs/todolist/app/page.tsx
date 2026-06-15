"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import { Task } from "@/db/schema";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const handleCreate = async () => {
    if (!title.trim()) return;

    setLoading(true);

    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      setTitle("");
      await fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  // Toggle Complete
  const handleToggle = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  // Delete Task
  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-violet-50 py-10">
        <div className="container mx-auto max-w-3xl rounded-xl bg-violet-100 p-6 shadow">

          {/* Add Task */}

          <h2 className="text-2xl font-bold mb-5">
            Add Task
          </h2>

          <div className="flex gap-3 mb-8">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreate();
                }
              }}
              placeholder="Enter task..."
              className="flex-1 rounded-md border bg-white p-3"
            />

            <button
              onClick={handleCreate}
              disabled={loading}
              className="rounded-md bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-500 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>

          </div>

          {/* Tasks */}

          <h2 className="text-2xl font-bold mb-5">
            Today's Tasks
          </h2>

          {tasks.length === 0 && (
            <p className="text-gray-500">
              No tasks yet.
            </p>
          )}

          <div className="space-y-3">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
              >

                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                    className="h-5 w-5 cursor-pointer"
                  />

                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }
                  >
                    {task.title}
                  </span>

                </div>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>
      </main>
    </>
  );
}