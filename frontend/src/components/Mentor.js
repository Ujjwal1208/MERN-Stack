import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Mentor = ({ mentor }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/mentor/${mentor._id}`}>
        <Card.Img src={mentor.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/mentor/${mentor._id}`}>
          <Card.Title as="div">
            <strong>{mentor.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={mentor.rating} text={`${mentor.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${mentor.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Mentor;
