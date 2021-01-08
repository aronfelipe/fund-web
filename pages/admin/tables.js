import React from "react";

import Router from "next/router";

import Admin from "layouts/Admin.js";

class Tables extends React.Component {
  componentDidMount = () => {
    Router.push("/admin/login");
  };
  render() {
    return <div />;
  }
}

Tables.layout = Admin;

export default Tables;
