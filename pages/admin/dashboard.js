import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

import Router from 'next/router'
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      value: 0,
      transfers: {},
      graphData: {}
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  showQuantities = e => {
    let quantities = []
    for (const [key, value] of Object.entries(this.state.transfers)) {
      quantities.push(
        <tr key={key}>
          <th scope="row">{key}</th>
          <td>{value}</td>
        </tr>
      )
    }
    return quantities
  }

  componentDidMount = e => {
    const token = localStorage.getItem('afund-api-token')
    axios
    .get("http://localhost:5000/transfer/consumer",  {headers: {
      "afund-api-token":  token
    }})
    .then(res => {
      let transfers = {}
      let transfer;
      let value = 0;
      for (transfer in res.data.response) {
        value = value + (parseFloat(res.data.response[transfer].quantity) * parseFloat(res.data.response[transfer].token.value))
        if (res.data.response[transfer].token.symbol in transfers) {
          transfers[res.data.response[transfer].token.symbol] = transfers[res.data.response[transfer].token.symbol] + parseFloat(res.data.response[transfer].quantity)
        } else {
          transfers[res.data.response[transfer].token.symbol] = parseFloat(res.data.response[transfer].quantity)
        }
      }
      this.setState({value: value})
      this.setState({transfers: transfers})
      let data = [];
      let labels = [];
      axios.get("http://localhost:5000/balance/consumer", {headers : {
        'afund-api-token': token
      }}).then(res => {
        let balances = res.data.response;
        balances.forEach(item => {
          let day_first_c = item.created_at[8];
          let day_second_c = item.created_at[9];
          let month_first_c = item.created_at[5];
          let month_second_c = item.created_at[6];

          let date = (day_first_c + day_second_c + "/" + month_first_c + month_second_c)

          labels.push(date)

          data.push(parseFloat(item.value))
        })
        this.setState({graphData: {
          labels: labels,
          datasets: [
            {
              label: "Performance",
              data: data
            }
          ]
        }})
      })
      })

    .catch(error => {
      console.error(error)
      Router.push('/auth/login')
    })
  }  
  graphData() {return this.state.graphData}

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Balanço
                      </h6>
                      <h2 className="mb-0">{this.state.value} BRLD</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Último mês</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line 
                      data={this.state.graphData}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Tokens</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Símbolo</th>
                      <th scope="col">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.showQuantities()}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Dashboard.layout = Admin;

export default Dashboard;
