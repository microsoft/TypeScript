//// [tests/cases/conformance/jsx/tsxUnionElementType5.tsx] ////

//// [file.tsx]
import React = require('react');

function EmptySFC1() {
    return <div>hello</div>;
}

function EmptySFC2() {
    return <div>Hello</div>;
}

function SFC2(prop: { x: boolean }) {
    return <h1>World</h1>;
}

var EmptySFCComp = EmptySFC1 || EmptySFC2;
var SFC2AndEmptyComp = SFC2 || EmptySFC1;

let a = <EmptySFCComp />
let a1 = <EmptySFCComp data-prop />
let b = <SFC2AndEmptyComp x />

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function EmptySFC1() {
    return React.createElement("div", null, "hello");
}
function EmptySFC2() {
    return React.createElement("div", null, "Hello");
}
function SFC2(prop) {
    return React.createElement("h1", null, "World");
}
var EmptySFCComp = EmptySFC1 || EmptySFC2;
var SFC2AndEmptyComp = SFC2 || EmptySFC1;
var a = React.createElement(EmptySFCComp, null);
var a1 = React.createElement(EmptySFCComp, { "data-prop": true });
var b = React.createElement(SFC2AndEmptyComp, { x: true });
