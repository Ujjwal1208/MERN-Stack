import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMentorDetails, addMentorReview } from "../actions/mentorActions";
import { MENTOR_ADD_REVIEW_RESET } from "../constants/mentorConstants";

const MentorScreen = ({ match }) => {
  const { id } = useParams();

  const [year, setYear] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const mentorDetails = useSelector((state) => state.mentorDetails);
  const { loading, error, mentor } = mentorDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const mentorAddReview = useSelector((state) => state.mentorAddReview);
  const { success: successMentorReview, error: errorMentorReviw } =
    mentorAddReview;

  useEffect(() => {
    if (successMentorReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: MENTOR_ADD_REVIEW_RESET });
    }
    dispatch(listMentorDetails(id));
  }, [dispatch, match, successMentorReview]);

  const navigate = useNavigate();

  const addMentorHandler = () => {
    navigate(`/cart/${id}?year=${year}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addMentorReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={mentor.image} alt={mentor.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{mentor.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={mentor.rating}
                    text={`${mentor.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${mentor.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {mentor.description}
                </ListGroup.Item>
              </ListGroup>
              <Col md={6} className="hi">
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${mentor.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {mentor.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {mentor.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Year</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                            >
                              {[...Array(mentor.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item className="hi">
                      <Button
                        onClick={addMentorHandler}
                        className="btn-block"
                        type="button"
                        disabled={mentor.countInStock === 0}
                      >
                        Add Mentor
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item className="hi">
                      <Link to="/">
                        <Button variant="outline-info">Go Back</Button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {mentor.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {mentor.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Student Review</h2>
                  {errorMentorReviw && (
                    <Message variant="danger">{errorMentorReviw}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="danger">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MentorScreen;
