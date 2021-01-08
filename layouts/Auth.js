import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

function Auth(props) {
  React.useEffect(() => {
    document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, []);
  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        {/* Mudei aqui para bg-gradient */}
        <div  className="header bg-gradient py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Bem vindo!</h1>
                  <p className="text-lead text-light">
                    Utilize suas credenciais para entrar na plataforma ou registre-se.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}

export default Auth;
