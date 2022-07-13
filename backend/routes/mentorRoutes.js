import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import {
  getMentors,
  getMentorById,
  deleteMentor,
  updateMentor,
  addMentor,
  addMentorReview,
  getTopMentors,
} from "../controllers/mentorControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getMentors).post(protect, admin, addMentor);

router.route("/:id/reviews").post(protect, addMentorReview);

router.get("/top", getTopMentors);

router
  .route("/:id")
  .get(getMentorById)
  .delete(protect, admin, deleteMentor)
  .put(protect, admin, updateMentor);

export default router;
