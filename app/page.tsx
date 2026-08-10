"use client";

import { useMemo, useState } from "react";
import { Check, Circle, Plus, Trash2 } from "lucide-react";
import "./styles.css";

type Todo = { id: number; text: string; done: boolean };

const initial: Todo[] = [
  { id: 1, text: "Siapkan tugasan hari ini", done: false },
  { id: 2, text: "Semak email penting", done: false },
  { id: 3, text: "Rehat 15 minit", done: true },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(initial);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const add = () => {
    const value = text.trim();
    if (!value) return;
    setTodos((items) => [...items, { id: Date.now(), text: value, done: false }]);
    setText("");
  };

  const visible = useMemo(() => todos.filter((t) => filter === "all" || (filter === "done" ? t.done : !t.done)), [todos, filter]);
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="page">
      <section className="app">
        <header>
          <div>
            <p className="eyebrow">RUANG PRODUKTIVITI</p>
            <h1>Senarai Tugas</h1>
            <p className="subtitle">Fokus pada perkara yang penting, satu demi satu.</p>
          </div>
          <div className="counter"><strong>{remaining}</strong><span>belum selesai</span></div>
        </header>

        <div className="composer">
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Apa yang perlu dibuat?" aria-label="Tugasan baharu" />
          <button onClick={add} aria-label="Tambah tugasan"><Plus size={21} /> Tambah</button>
        </div>

        <nav className="filters" aria-label="Penapis tugas">
          {([['all','Semua'],['active','Belum selesai'],['done','Selesai']] as const).map(([key,label]) => <button key={key} className={filter === key ? "selected" : ""} onClick={() => setFilter(key)}>{label}</button>)}
        </nav>

        <div className="list">
          {visible.length === 0 ? <div className="empty">Tiada tugasan di sini. Nikmati ruang kosong ✨</div> : visible.map((todo) => (
            <article className={`todo ${todo.done ? "completed" : ""}`} key={todo.id}>
              <button className="check" onClick={() => setTodos((items) => items.map((t) => t.id === todo.id ? { ...t, done: !t.done } : t))} aria-label={todo.done ? "Tanda belum selesai" : "Tanda selesai"}>{todo.done ? <Check size={18}/> : <Circle size={20}/>}</button>
              <span>{todo.text}</span>
              <button className="delete" onClick={() => setTodos((items) => items.filter((t) => t.id !== todo.id))} aria-label="Padam tugasan"><Trash2 size={17}/></button>
            </article>
          ))}
        </div>

        <footer><span>{todos.length} tugasan</span><button onClick={() => setTodos((items) => items.filter((t) => !t.done))}>Padam yang selesai</button></footer>
      </section>
    </main>
  );
}
