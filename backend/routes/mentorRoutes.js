import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import { getMentors, getMentorById } from "../controllers/mentorControllers.js";

router.route("/").get(getMentors);

router.route("/:id").get(getMentorById);
//   const mentor = await Mentor.findById(req.params.id);

//   if (mentor) {
//     res.json(mentor);
//   } else {
//     res.status(404).json({ message: "Mentor not found " });
//   }

//   res.json(mentor);
// })

export default router;
