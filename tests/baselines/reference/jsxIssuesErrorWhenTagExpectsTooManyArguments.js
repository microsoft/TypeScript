//// [jsxIssuesErrorWhenTagExpectsTooManyArguments.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

interface MyProps {
    x: number;
}

function MyComp(props: MyProps, context: any, bad: any, verybad: any) {
    return <div></div>;
}

const a = <MyComp x={2}/>; // using `MyComp` as a component should error - it expects more arguments than react provides

function MyComp2(props: MyProps, context: any) {
    return <div></div>
}
const b  = <MyComp2 x={2}/>; // Should be OK, `context` is allowed, per react rules

//// [jsxIssuesErrorWhenTagExpectsTooManyArguments.js]
"use strict";
/// <reference path="react16.d.ts" />
exports.__esModule = true;
var React = require("react");
function MyComp(props, context, bad, verybad) {
    return React.createElement("div", null);
}
var a = React.createElement(MyComp, { x: 2 }); // using `MyComp` as a component should error - it expects more arguments than react provides
function MyComp2(props, context) {
    return React.createElement("div", null);
}
var b = React.createElement(MyComp2, { x: 2 }); // Should be OK, `context` is allowed, per react rules
