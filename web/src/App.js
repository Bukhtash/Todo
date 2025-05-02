import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/Todo"
import ViewPage from "./pages/view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
