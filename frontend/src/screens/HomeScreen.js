import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Mentor from "../components/Mentor";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listMentors } from "../actions/mentorActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const mentorList = useSelector((state) => state.mentorList);
  const { loading, error, mentors } = mentorList;

  useEffect(() => {
    dispatch(listMentors());
  }, [dispatch]);

  return (
    <>
      <h1 className="super">Super Mentors</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {mentors.map((mentor) => (
            <Col
              key={mentor._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="card_home"
            >
              <Mentor mentor={mentor} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
