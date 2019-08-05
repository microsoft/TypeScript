//// [file.tsx]
import * as React from "react";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "a-b": any;
            "a-c": any;
        }
    }
}
const Compa = (x: {x: number}) => <div>{"" + x}</div>;

let a = <\u0061></a>; // works
let ab = <\u0061-b></a-b>; // works
let ac = <a-\u0063></a-c>; // works
let compa = <Comp\u0061 x={12} />; // works


//// [file.js]
"use strict";
exports.__esModule = true;
var React = require("react");
var Compa = function (x) { return React.createElement("div", null, "" + x); };
var a = React.createElement("a", null); // works
var ab = React.createElement("a-b", null); // works
var ac = React.createElement("a-c", null); // works
var compa = React.createElement(Comp\u0061, { x: 12 }); // works
