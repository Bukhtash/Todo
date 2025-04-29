from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Info(BaseModel):
    name: str
    message: str

# Store the latest data
latest_data: dict | None = None

@app.post("/submit")
async def receive_data(data: Info):
    global latest_data
    latest_data = data.dict()
    return {"status": "received"}

@app.get("/submit")
def get_latest_data():
    if latest_data:
        return latest_data
    return {"message": "No data submitted yet."}
