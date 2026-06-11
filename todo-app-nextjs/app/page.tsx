'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => { fetchTodos(); }, []);

  async function fetchTodos() {
    setLoading(true);
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  }

  async function addTodo() {
    if (!input.trim()) return;
    setAdding(true);
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input }),
    });
    const todo = await res.json();
    setTodos([todo, ...todos]);
    setInput('');
    setAdding(false);
  }

  async function toggleTodo(id: number, completed: boolean) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  }

  async function deleteTodo(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  }

  const done = todos.filter(t => t.completed).length;

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
    }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '560px', marginBottom: '48px' }}>
        <p style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
          // task manager
        </p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 800, lineHeight: 1, color: 'var(--text)', margin: 0 }}>
          TODO<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>
        {!loading && todos.length > 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '12px', fontFamily: 'DM Mono, monospace' }}>
            {done}/{todos.length} completed
          </p>
        )}
      </div>

      {/* Input */}
      <div style={{ width: '100%', maxWidth: '560px', marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          gap: '0',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          overflow: 'hidden',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '16px 20px',
              color: 'var(--text)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '14px',
            }}
          />
          <button
            onClick={addTodo}
            disabled={adding || !input.trim()}
            style={{
              background: 'var(--accent)',
              border: 'none',
              padding: '16px 24px',
              color: '#0f0f0f',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              letterSpacing: '1px',
              opacity: adding || !input.trim() ? 0.4 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            ADD
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ width: '100%', maxWidth: '560px' }}>
        {loading ? (
          <p style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>
            loading...
          </p>
        ) : todos.length === 0 ? (
          <div style={{
            border: '1px dashed var(--border)',
            padding: '60px 20px',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--muted)', fontFamily: 'DM Mono', fontSize: '13px' }}>no todos yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {todos.map((todo, i) => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: 'var(--surface)',
                  borderLeft: todo.completed ? '3px solid var(--accent)' : '3px solid transparent',
                  transition: 'border-color 0.2s',
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: `2px solid ${todo.completed ? 'var(--accent)' : 'var(--border)'}`,
                    background: todo.completed ? 'var(--accent)' : 'transparent',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                  aria-label="Toggle"
                >
                  {todo.completed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {/* Title */}
                <span style={{
                  flex: 1,
                  fontSize: '14px',
                  fontFamily: 'DM Mono, monospace',
                  color: todo.completed ? 'var(--muted)' : 'var(--text)',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  transition: 'all 0.15s',
                  wordBreak: 'break-word',
                }}>
                  {todo.title}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.4,
                    transition: 'opacity 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
                  aria-label="Delete"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Clear completed */}
        {done > 0 && (
          <button
            onClick={async () => {
              const completed = todos.filter(t => t.completed);
              await Promise.all(completed.map(t => fetch(`/api/todos/${t.id}`, { method: 'DELETE' })));
              setTodos(todos.filter(t => !t.completed));
            }}
            style={{
              marginTop: '24px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              padding: '10px 20px',
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              cursor: 'pointer',
              width: '100%',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            clear {done} completed
          </button>
        )}
      </div>
    </main>
  );
}
