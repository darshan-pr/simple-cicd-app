from fastapi import FastAPI
from sqlalchemy import create_engine,text

app = FastAPI()

DATABASE_URL="postgresql://postgres:postgres@db:5432/demo"

engine=create_engine(DATABASE_URL)

@app.get("/")

def home():
    return {"message":"Backend Working"}

@app.get("/health")

def health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status":"healthy"}