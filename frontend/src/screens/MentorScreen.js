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
import { listMentorDetails } from "../actions/mentorActions";

const MentorScreen = ({ match }) => {
  const { id } = useParams();

  const [year, setYear] = useState(0);

  const dispatch = useDispatch();

  const mentorDetails = useSelector((state) => state.mentorDetails);
  const { loading, error, mentor } = mentorDetails;

  useEffect(() => {
    dispatch(listMentorDetails(id));
  }, [dispatch, match]);

  const navigate = useNavigate();

  const addMentorHandler = () => {
    navigate(`/cart/${id}?year=${year}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
              <ListGroup.Item>Description: {mentor.description}</ListGroup.Item>
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
                        {mentor.countInStock > 0 ? "In Stock" : "Out of Stock"}
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
                            {[...Array(mentor.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
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
      )}
    </>
  );
};

export default MentorScreen;
