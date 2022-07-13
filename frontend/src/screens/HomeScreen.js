import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Mentor from "../components/Mentor";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { listMentors } from "../actions/mentorActions";
import MentorCarousel from "../components/MentorCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const mentorList = useSelector((state) => state.mentorList);
  const { loading, error, mentors, page, pages } = mentorList;

  useEffect(() => {
    dispatch(listMentors(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <MentorCarousel />}
      <h1 className="super">Super Mentors</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
