import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center copy py-3">
            Copyright &copy; Learn India
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
