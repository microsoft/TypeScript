//// [tests/cases/conformance/jsx/tsxUnionElementType6.tsx] ////

//// [file.tsx]
import React = require('react');

function EmptySFC1() {
    return <div>Hi</div>
}

function EmptySFC2() {
    return <div>Hello</div>
}

function SFC2(prop: { x: boolean }) {
    return <h1>World</h1>;
}

var EmptySFCComp = EmptySFC1 || EmptySFC2;
var SFC2AndEmptyComp = SFC2 || EmptySFC1;
// Error
let a = <EmptySFCComp x />;
let b = <SFC2AndEmptyComp x="hi" />;
let c = <SFC2AndEmptyComp />;
let d = <SFC2AndEmptyComp data-prop />;



//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function EmptySFC1() {
    return React.createElement("div", null, "Hi");
}
function EmptySFC2() {
    return React.createElement("div", null, "Hello");
}
function SFC2(prop) {
    return React.createElement("h1", null, "World");
}
var EmptySFCComp = EmptySFC1 || EmptySFC2;
var SFC2AndEmptyComp = SFC2 || EmptySFC1;
// Error
var a = React.createElement(EmptySFCComp, { x: true });
var b = React.createElement(SFC2AndEmptyComp, { x: "hi" });
var c = React.createElement(SFC2AndEmptyComp, null);
var d = React.createElement(SFC2AndEmptyComp, { "data-prop": true });
