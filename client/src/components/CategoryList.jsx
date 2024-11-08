// CategoryList.jsx
const CategoryList = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categories.map((category) => (
        <div
          key={category.category_id}
          className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-gray-200 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-3 border-b border-gray-300 pb-2">
            {category.category_name}
          </h3>
          <ul className="list-inside space-y-2 text-gray-700">
            {category.questions.length > 0 ? (
              category.questions.map((question) => (
                <li key={question.question_id} className="flex items-start">
                  <span className="mr-2 text-blue-400">•</span>
                  <span className="flex-1">{question.question}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">
                No questions added yet
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
