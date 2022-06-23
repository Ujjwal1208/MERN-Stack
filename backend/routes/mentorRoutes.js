import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Mentor from "../models/mentorModel.js";

// @desc     Fetch all mentors
// @route    GET /api/mentors
// @access   Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const mentors = await Mentor.find({});

    res.json(mentors);
  })
);

// @desc     Fetch single mentor
// @route    GET /api/mentors/:id
// @access   Public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
      res.status(404).send("Link Not Found - invalid id");
    }

    try {
      const mentor = await Mentor.findById(req.params.id);
      if (mentor) {
        res.send(mentor);
      }
      res.status(404).send("Link Not Found - does not exists");
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
);
//   const mentor = await Mentor.findById(req.params.id);

//   if (mentor) {
//     res.json(mentor);
//   } else {
//     res.status(404).json({ message: "Mentor not found " });
//   }

//   res.json(mentor);
// })

export default router;
