import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 style={{fontSize: "4.2vw"}} className="display-2 text-white">Hey {this.props.user.email}</h1>
                <p className="text-white mt-0 mb-5">
                  Me conte o que gostaria de ver aqui.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
