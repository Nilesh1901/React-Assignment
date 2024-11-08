import sqlite3Pkg from "sqlite3";
const sqlite3 = sqlite3Pkg.verbose();

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");

    // Create tables
    db.run(`
      CREATE TABLE IF NOT EXISTS master (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS detail (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        master_id INTEGER,
        FOREIGN KEY (master_id) REFERENCES master(id)
      )
    `);
  }
});

export default db;
