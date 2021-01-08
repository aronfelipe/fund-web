/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <div style={{textAlign: "center"}}>
                © {new Date().getFullYear()}{" "}
                afund
              </div>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
