import React, { useState, useEffect, useInsertionEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listMentors, deleteMentor, addMentor } from "../actions/mentorActions";
import { MENTOR_ADD_RESET } from "../constants/mentorConstants";

const MentorListScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const mentorList = useSelector((state) => state.mentorList);
  const { loading, error, mentors, page, pages } = mentorList;

  const mentorDelete = useSelector((state) => state.mentorDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = mentorDelete;

  const mentorAdd = useSelector((state) => state.mentorAdd);
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
    mentor: addedMentor,
  } = mentorAdd;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: MENTOR_ADD_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successAdd) {
      navigate(`/admin/mentor/${addedMentor._id}/edit`);
    } else {
      dispatch(listMentors("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successAdd,
    addedMentor,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteMentor(id));
    }
  };

  const addMentorHandler = () => {
    dispatch(addMentor());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Mentors</h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={addMentorHandler}>
            <i className="fas fa-plus"></i> Add Mentor
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingAdd && <Loader />}
      {errorAdd && <Message variant="danger">{errorAdd}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>SUBJECT</th>
                <th>COLLEGE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr key={mentor._id}>
                  <td>{mentor._id}</td>
                  <td>{mentor.name}</td>
                  <td>${mentor.price}</td>
                  <td>{mentor.category}</td>
                  <td>{mentor.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/mentor/${mentor._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(mentor._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default MentorListScreen;
