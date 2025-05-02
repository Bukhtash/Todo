from fastapi import FastAPI,HTTPException
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

Items = []
current_id = 0
class TodoItem(BaseModel):
    id:int
    itemValue: str
    completed: bool

class TodoCreate(BaseModel):
    itemValue: str
    completed: bool




@app.post("/items", response_model=TodoItem)
async def add_item(item: TodoCreate):
    global current_id
    new_item = {
        "id": current_id,
        "itemValue": item.itemValue,
        "completed": item.completed
    }
    Items.append(new_item)
    current_id += 1
    return new_item

@app.get("/")
async def getItems():
    return Items


@app.get("/{id}")
async def get_item(id: int):
    for item in Items:
        if item["id"] == id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


@app.put("/items/{id}", response_model=TodoItem)
async def toggle_item(id: int):
    for item in Items:
        if item["id"] == id:
            item["completed"] = not item["completed"]
            return item
    raise HTTPException(status_code=404, detail="Item not found")


@app.delete("/items/{id}", response_model=TodoItem)
async def delete_item(id: int):
    for i, item in enumerate(Items):
        if item["id"] == id:
            deleted = Items.pop(i)
            return deleted
    raise HTTPException(status_code=404, detail="Item not found")


