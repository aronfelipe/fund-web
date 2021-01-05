import React from "react";
import Router from 'next/router'
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      'email': '',
      'password': '',
      'login': ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios
    .post("http://localhost:5000/auth/login", user)

    .then(res => {
      console.log(res);
      if (res.data.status == 200) {
        localStorage.setItem('afund-api-token', res.data.response);
        Router.push('/admin/dashboard')
      } else {
        if (res.data.status === 401) {
          this.setState({login: 1})
        } else if (res.data.status === 404) {
          this.setState({login: 2})
        }
      }
    })
  }

  loginCheck() {
    if (this.state.login === 1) {
      return <span className="text-red font-weight-700">Senha incorreta</span>
    } else if (this.state.login === 2) {
      return <span className="text-red font-weight-700">Esse email não está registado na plataforma</span>
    } else {
      return;
    }
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Entre com seu usuário e senha</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Entre com seu email e senha</small>
              </div>
              <Form role="form" onSubmit={(e) => {this.submitForm(e)}}>
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" />
                  </InputGroup>
                </FormGroup> */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite seu email"
                      type="email"
                      name="email"
                      autoComplete="new-email"
                      onChange={ (e) => {
                        this.handleChange(e)
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      onChange={ (e) => {
                        this.handleChange(e)
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    {" "}
                    {this.loginCheck()}
                    {/* <span className="text-success font-weight-700">{this.state.passwordStrong()}</span> */}
                  </small>
                </div>
                <div className="text-center">
                  <Button className="mt-4" color="secondary" type="submit">
                    Log in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>

          <Row className="mt-3">
            {/* <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col> */}
          </Row>
        </Col>
      </>
    );
  }
}

Login.layout = Auth;

export default Login;
