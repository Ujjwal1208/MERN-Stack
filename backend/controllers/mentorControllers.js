import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";
import { useSearchParams } from "react-router-dom";

const getMentors = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Mentor.countDocuments({ ...keyword });
  const mentors = await Mentor.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ mentors, page, pages: Math.ceil(count / pageSize) });
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

const deleteMentor = asyncHandler(async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidId) {
    res.status(404).send("Link Not Found - invalid id");
  }

  try {
    const mentor = await Mentor.findById(req.params.id);
    if (mentor) {
      await mentor.remove();
      res.json({ message: "Mentor Removed" });
    }
    res.status(404).send("Link Not Found - does not exists");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const addMentor = asyncHandler(async (req, res) => {
  const mentor = new Mentor({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    counterInStock: 0,
    numReviews: 0,
    description: "Sample descripton",
  });

  const addedMentor = await mentor.save();
  res.status(201).json(addedMentor);
});

const updateMentor = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    mentor.name = name;
    mentor.price = price;
    mentor.description = description;
    mentor.image = image;
    mentor.brand = brand;
    mentor.category = category;
    mentor.countInStock = countInStock;

    const updatedMentor = await mentor.save();
    res.json(updatedMentor);
  } else {
    res.status(201).json(mentor);
    throw new Error("Mentor not found");
  }
});

const addMentorReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    const alreadyReviewed = mentor.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Mentor already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    mentor.reviews.push(review);

    mentor.numReviews = mentor.reviews.length;

    mentor.rating =
      mentor.reviews.reduce((acc, item) => item.rating + acc, 0) /
      mentor.reviews.length;

    await mentor.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(201).json(mentor);
    throw new Error("Mentor not found");
  }
});

const getTopMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find({}).sort({ rating: -1 }).limit(3);

  res.json(mentors);
});

export {
  getMentors,
  getMentorById,
  deleteMentor,
  addMentor,
  updateMentor,
  addMentorReview,
  getTopMentors,
};
