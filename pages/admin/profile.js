import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import Router from 'next/router'

import axios from "axios";

import URL from '../../config'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount = e => {
    const token = localStorage.getItem('afund-api-token')
    axios
    .get("http://" + URL.api + ":5000/user/consumer/profile",  {headers: {
      "afund-api-token":  token
    }})
    .then(res => {
      this.setState({user: res.data.response})}
    )
    .catch(error => {
      console.error(error)
      Router.push('/auth/login')
    })}
    
  render() {
    return (
      <>
        <UserHeader user={this.state.user} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={this.state.user.photo}
                          style={{width: "120%"}}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.user.email}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      <img
                      style={{width: "8%"}}
                      alt="..."
                      src={require("assets/img/icons/common/pin.svg")}
                    />
                      Earth
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Profile.layout = Admin;

export default Profile;
