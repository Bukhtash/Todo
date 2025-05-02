import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function View() {
  const { id } = useParams();
  const [item, setItem] = useState(null);


    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/${id}`);
          setItem(response.data);
        } catch (error) {
          console.log("Error fetching items: ", error);
        }
      };

      fetchItems(); // fetch once on load
    }, [id]);

    if (!item) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
          Viewing Task
        </h2>

        <div className="space-y-2 text-center">
          <p>
            <strong>Task:</strong> {item.itemValue}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {item.completed ? "✅ Completed" : "❌ Not Completed"}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            ← Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default View;
