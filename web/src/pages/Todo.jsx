import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function Todo() {
  const [items, setItems] = useState([]);
  const [item, SetItem] = useState("");
  const [Completed, setCompleted] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/");
      setItems(response.data);
    } catch (error) {
      console.log("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchItems(); // fetch once on load
  }, []);

  const AddItem = async () => {
    if (item.trim() === "") return;

    const newItem = {
      itemValue: item, // string
      completed: Completed, // boolean
    };

    console.log(newItem);

    try {
      const res = await axios.post("http://127.0.0.1:8000/items", newItem);
      console.log(res.message);
      SetItem("");
      setCompleted(false);
      fetchItems();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const toggleCompleted = async (value) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/items/${encodeURIComponent(value)}`
      );
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDeleted = async (value) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/items/${encodeURIComponent(value)}`
      );
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>

        {/* Input */}

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter a task"
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 outline-none"
            value={item}
            onChange={(e) => SetItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddItem();
              }
            }}
          />
          <button
            onClick={AddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Item */}

        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCompleted(item.id)}
                />
                <span
                  className={item.completed ? "line-through text-gray-400" : ""}
                >
                  {item.itemValue}
                </span>
              </label>
              <div className="flex items-center gap-2">
                <Link
                  to={`/view/${item.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEye />
                </Link>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => toggleDeleted(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
