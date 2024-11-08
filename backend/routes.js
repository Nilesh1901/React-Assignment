// routes.js
import express from "express";
import { addCategories, addQuestions, getCategories } from "./controllers.js";
const router = express.Router();

// Add a new category
router.post("/categories", addCategories);

// Add a new question
router.post("/questions", addQuestions);

// Get all categories with their questions
router.get("/categories", getCategories);



export default router;
