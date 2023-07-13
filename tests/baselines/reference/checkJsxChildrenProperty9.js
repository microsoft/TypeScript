//// [tests/cases/conformance/jsx/checkJsxChildrenProperty9.tsx] ////

//// [file.tsx]
import React = require('react');

// OK
let k1 = <div> <h2> Hello </h2> <h1> world </h1></div>;
let k2 = <div> <h2> Hello </h2> {(user: any) => <h2>{user.name}</h2>}</div>;
let k3 = <div> {1} {"That is a number"} </div>;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// OK
var k1 = <div> <h2> Hello </h2> <h1> world </h1></div>;
var k2 = <div> <h2> Hello </h2> {function (user) { return <h2>{user.name}</h2>; }}</div>;
var k3 = <div> {1} {"That is a number"} </div>;
