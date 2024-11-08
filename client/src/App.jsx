// App.jsx
import { useState, useEffect } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import QuestionForm from "./components/QuestionForm";

const App = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    fetchCategories();
  };

  const handleAddQuestion = () => {
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 border-b-[0.6px] border-gray-400 pb-6 rounded-sm">
        Category and Question Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side: Add Forms */}
        <div className="col-span-5 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add Category
            </h2>
            <CategoryForm onAddCategory={handleAddCategory} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add Question
            </h2>
            <QuestionForm
              categories={categories}
              onAddQuestion={handleAddQuestion}
            />
          </div>
        </div>

        {/* Right Side: Category List */}
        <div className="col-span-7">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Category List
          </h2>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default App;
