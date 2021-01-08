import React from "react";
import Admin from "layouts/Admin.js";
import Router from "next/router";

class Icons extends React.Component {
  componentDidMount = () => {
    Router.push("/admin/dashboard");
  };
  render() {
    return <div />;
  }
}

Icons.layout = Admin;

export default Icons;
