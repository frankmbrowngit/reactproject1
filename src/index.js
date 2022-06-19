import ReactDOM from "react-dom";
import React from "react";
// It matters the order in which you import the css files
// Css files that are imported later override things that are imported earlier



import 'bootstrap/dist/js/bootstrap.min.js';

import "./index.scss";

import App from './App.js';
// const h2Element = React.createElement("h2", null, "What a nice day");
// const element = React.createElement(
//   "h1",
//   { className: "title" },
//   "Hello World",
//   h2Element
// );
// debugger
const rootElement = document.getElementById("fmbApp");
ReactDOM.render(<App/>, rootElement);
