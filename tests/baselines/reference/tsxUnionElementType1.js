//// [tests/cases/conformance/jsx/tsxUnionElementType1.tsx] ////

//// [file.tsx]
import React = require('react');

function SFC1(prop: { x: number }) {
    return <div>hello</div>;
};

function SFC2(prop: { x: boolean }) {
    return <h1>World </h1>;
}

var SFCComp = SFC1 || SFC2;
<SFCComp x />

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function SFC1(prop) {
    return React.createElement("div", null, "hello");
}
;
function SFC2(prop) {
    return React.createElement("h1", null, "World ");
}
var SFCComp = SFC1 || SFC2;
React.createElement(SFCComp, { x: true });
