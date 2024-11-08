import db from "./db.js";

export function addCategories(req, res) {
  const { category_name } = req.body;

  // Validate category_name
  if (!category_name || category_name.trim() === "") {
    return res.status(400).json({ error: "Category name is required" });
  }

  db.run(
    `INSERT INTO master (category_name) VALUES (?)`,
    [category_name],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
}

export function addQuestions(req, res) {
  const { question, master_id } = req.body;
  // Validate question and master_id
  if (!question || question.trim() === "" || !master_id) {
    return res
      .status(400)
      .json({ error: "Question and category ID are required" });
  }

  // Check if the category exists
  db.get(`SELECT * FROM master WHERE id = ?`, [master_id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      return res.status(404).json({ error: "Category not found" });
    }

    // If category exists, insert the question
    db.run(
      `INSERT INTO detail (question, master_id) VALUES (?, ?)`,
      [question, master_id],
      function (err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({ id: this.lastID });
      }
    );
  });
}

export function getCategories(req, res) {
  db.all(
    `SELECT master.id AS category_id, master.category_name, detail.id AS question_id, detail.question
     FROM master LEFT JOIN detail ON master.id = detail.master_id`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Error retrieving categories" });
        return;
      }

      const result = rows.reduce((acc, row) => {
        const { category_id, category_name, question_id, question } = row;
        if (!acc[category_id]) {
          acc[category_id] = { category_id, category_name, questions: [] };
        }
        if (question) {
          acc[category_id].questions.push({ question_id, question });
        }
        return acc;
      }, {});
      res.json(Object.values(result));
    }
  );
}
