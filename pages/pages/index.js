'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ name: '', ingredients: '' });

  // Load recipes from FastAPI
  useEffect(() => {
    fetch('http://localhost:8000/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  // Add new recipe
  const addRecipe = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', ingredients: '' });
    // Refresh list
    const updated = await fetch('http://localhost:8000/recipes').then((res) => res.json());
    setRecipes(updated);
  };

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>🍳 Recipe Collector</h1>
      <form onSubmit={addRecipe}>
        <input
          type="text"
          placeholder="Recipe name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Ingredients"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />
        <button type="submit" style={{ marginLeft: 10 }}>Add</button>
      </form>

      <h2 style={{ marginTop: 40 }}>📜 Recipes:</h2>
      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            <b>{r.name}</b>: {r.ingredients}
          </li>
        ))}
      </ul>
    </main>
  );
}
