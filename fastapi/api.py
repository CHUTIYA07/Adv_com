import os
import asyncpg
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

app = FastAPI(title="Recipe Collector API")

# Read environment variables
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

class Recipe(BaseModel):
    name: str
    ingredients: str

# Connect to Supabase PostgreSQL on startup
@app.on_event("startup")
async def startup():
    try:
        app.state.db = await asyncpg.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        print("✅ Connected to Supabase PostgreSQL!")
    except Exception as e:
        print("❌ Database connection failed:", e)

@app.on_event("shutdown")
async def shutdown():
    await app.state.db.close()

@app.get("/")
def home():
    return {"message": "FastAPI running and connected to Supabase"}

@app.get("/recipes")
async def get_recipes():
    try:
        rows = await app.state.db.fetch("SELECT * FROM recipes ORDER BY id;")
        return [dict(r) for r in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recipes")
async def add_recipe(recipe: Recipe):
    try:
        query = "INSERT INTO recipes (name, ingredients) VALUES ($1, $2)"
        await app.state.db.execute(query, recipe.name, recipe.ingredients)
        return {"status": "Recipe added", "recipe": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
