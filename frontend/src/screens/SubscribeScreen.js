import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addMentor, removeMentor } from "../actions/subscribeActions";

const SubscribeScreen = ({ match }) => {
  const { id } = useParams();
  const mentorId = id;

  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const year =
    [...searchParams].length > 0 ? Number([...searchParams][0][1]) : 1;

  const dispatch = useDispatch();

  const subscribe = useSelector((state) => state.subscribe);
  const { subscribeItems } = subscribe;

  console.log(subscribeItems);

  useEffect(() => {
    if (mentorId) {
      dispatch(addMentor(mentorId, year));
    }
  }, [dispatch, mentorId, year]);

  const removeMentorHandler = (id) => {
    dispatch(removeMentor(id));
  };

  const submitHandler = () => {
    navigate(`/login?redirect=${"/shipping"}`);
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Added Mentor</h2>
        {subscribeItems.length === 0 ? (
          <Message>
            Your have not added any mentor <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {subscribeItems.map((item) => (
              <ListGroup.Item key={item.mentor}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/mentor/${item.mentor}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.year}
                      onChange={(e) =>
                        dispatch(addMentor(item.mentor, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeMentorHandler(item.mentor)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total (
                {subscribeItems.reduce((acc, item) => acc + item.year, 0)})
                Years
              </h2>
              $
              {subscribeItems
                .reduce((acc, item) => acc + item.year * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={subscribeItems.length === 0}
                onClick={submitHandler}
              >
                Proceed to Submit
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default SubscribeScreen;
