import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopMentors } from "../actions/mentorActions";

const MentorCarousel = () => {
  const dispatch = useDispatch();

  const mentorTopRated = useSelector((state) => state.mentorTopRated);
  const { loading, error, mentors } = mentorTopRated;

  useEffect(() => {
    dispatch(listTopMentors());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {mentors.map((mentor) => (
        <Carousel.Item key={mentor._id}>
          <Link to={`/mentor/${mentor._id}`}>
            <Image src={mentor.image} alt={mentor.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {mentor.name} (${mentor.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MentorCarousel;
