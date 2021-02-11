import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Navbar,
  Container,
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link href="/admin/dashboard">
              <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
                {this.props.brandText}
              </a>
            </Link>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
