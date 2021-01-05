import React from "react";

import axios from "axios";

import zxcvbn from 'zxcvbn';

import Router from 'next/router'

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

class Register extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      'email': '',
      'password': '',
      'passwordcheck': '',
      'therms': ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    // console.log(`Email: ${ this.state.email }`)
    if (this.state.password === this.state.passwordcheck) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      axios
      .post("http://localhost:5000/auth/register", user)
      .then(Router.push('/auth/login'))
    } else {
      alert("Altere as senhas para que fiquem iguais")
    }

  }

  passwordDoNotMatch() {
    return (<small>
      <span className="text-red font-weight-700">Senhas não coincidem</span>
    </small>);
  }
  
  passwordDoMatch() {
    return (<small>
      <span className="text-gray font-weight-700">Senhas coincidem, pode prosseguir com o registro</span>
    </small>);
  }

  passwordCheck() {
    if (this.state.passwordcheck === '') {
      return;
    }
    if (this.state.password === this.state.passwordcheck) {
      return this.passwordDoMatch()
    }
    return this.passwordDoNotMatch()
  }

  passwordStrength() {
    const passwordStrength = zxcvbn(this.state.password)
    if (passwordStrength.score == 0) {
      return <span className="text-red font-weight-700">muito fraca</span>
    }
    else if (passwordStrength.score == 1) {
      return <span className="text-red font-weight-700">fraca</span>
    }
    else if (passwordStrength.score == 2) {
      return <span className="text-yellow font-weight-700">média</span>
    }
    else if (passwordStrength.score == 3) {
      return <span className="text-green font-weight-700">segura</span>
    }
    else if (passwordStrength.score == 4) {
      return <span className="text-green font-weight-700">muito segura</span>
    }
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
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
                <small>Se registre com seu email e senha</small>
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
                <div className="text-muted font-italic" style={{marginBottom: "0.7cm"}}>
                  <small>
                    Força da senha:{" "}
                    {this.passwordStrength()}
                    {/* <span className="text-success font-weight-700">{this.state.passwordStrong()}</span> */}
                  </small>
                </div>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite sua senha novamente"
                      type="password"
                      name="passwordcheck"
                      autoComplete="new-passwordcheck"
                      onChange={ (e) => {
                        this.handleChange(e)
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-muted">
                  {this.passwordCheck()}
                </div>
                {/* <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        name="therms"
                        onChange={ (e) => {
                          this.handleChange(e)
                        }}                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row> */}
                <div className="text-center">
                  <Button className="mt-4" color="secondary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

Register.layout = Auth;

export default Register;
