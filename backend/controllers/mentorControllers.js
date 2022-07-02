import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";

const getMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find({});

  res.json(mentors);
});

const getMentorById = asyncHandler(async (req, res) => {
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
});

export { getMentors, getMentorById };
