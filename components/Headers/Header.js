import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
