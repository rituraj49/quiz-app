import express from 'express';
import { createController, retrieveQuestions } from '../controllers/questionController.js';

const router = express.Router();

router.post("/add-question", createController)

router.get("/get-all", retrieveQuestions)

export default router;