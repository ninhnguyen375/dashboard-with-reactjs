import React, { Component } from "react";
export default class ToHome extends Component {
  render() {
    return <div>{(window.location = "/home")}</div>;
  }
}
