//// [tests/cases/conformance/jsx/tsxUnionElementType2.tsx] ////

//// [file.tsx]
import React = require('react');

function SFC1(prop: { x: number }) {
    return <div>hello</div>;
};

function SFC2(prop: { x: boolean }) {
    return <h1>World </h1>;
}

var SFCComp = SFC1 || SFC2;
<SFCComp x={"hi"}/>

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function SFC1(prop) {
    return <div>hello</div>;
}
;
function SFC2(prop) {
    return <h1>World </h1>;
}
var SFCComp = SFC1 || SFC2;
<SFCComp x={"hi"}/>;
