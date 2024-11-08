// QuestionForm.jsx
import { useState } from "react";

const QuestionForm = ({ categories, onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !selectedCategoryId) return;

    const response = await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, master_id: selectedCategoryId }),
    });

    if (response.ok) {
      onAddQuestion();
      setQuestion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4">
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out duration-150"
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question"
        className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out duration-150"
      />

      <button
        type="submit"
        className="bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700 transition-all ease-in-out duration-200 transform hover:scale-105"
      >
        + Add Question
      </button>
    </form>
  );
};

export default QuestionForm;
