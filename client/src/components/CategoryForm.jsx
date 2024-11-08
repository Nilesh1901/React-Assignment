// CategoryForm.jsx
import { useState } from "react";

const CategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) return;

    const response = await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_name: categoryName }),
    });

    if (response.ok) {
      onAddCategory();
      setCategoryName("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          + Add Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
