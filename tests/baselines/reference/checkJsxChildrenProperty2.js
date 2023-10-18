//// [tests/cases/conformance/jsx/checkJsxChildrenProperty2.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: string | JSX.Element
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// Error: missing children
let k = <Comp a={10} b="hi" />;

let k0 =
    <Comp a={10} b="hi" children="Random" >
        hi hi hi!
    </Comp>;

let o = {
     children:"Random"
}
let k1 =
    <Comp a={10} b="hi" {...o} >
        hi hi hi!
    </Comp>;

// Error: incorrect type
let k2 =
    <Comp a={10} b="hi">
        <div> My Div </div>
        {(name: string) => <div> My name {name} </div>}
    </Comp>;

let k3 =
    <Comp a={10} b="hi">
        <div> My Div </div>
        {1000000}
    </Comp>;

let k4 =
    <Comp a={10} b="hi" >
        <div> My Div </div>
        hi hi hi!
    </Comp>;

let k5 =
    <Comp a={10} b="hi" >
        <div> My Div </div>
        <div> My Div </div>
    </Comp>;


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Comp(p) {
    return <div>{p.b}</div>;
}
// Error: missing children
var k = <Comp a={10} b="hi"/>;
var k0 = <Comp a={10} b="hi" children="Random">
        hi hi hi!
    </Comp>;
var o = {
    children: "Random"
};
var k1 = <Comp a={10} b="hi" {...o}>
        hi hi hi!
    </Comp>;
// Error: incorrect type
var k2 = <Comp a={10} b="hi">
        <div> My Div </div>
        {function (name) { return <div> My name {name} </div>; }}
    </Comp>;
var k3 = <Comp a={10} b="hi">
        <div> My Div </div>
        {1000000}
    </Comp>;
var k4 = <Comp a={10} b="hi">
        <div> My Div </div>
        hi hi hi!
    </Comp>;
var k5 = <Comp a={10} b="hi">
        <div> My Div </div>
        <div> My Div </div>
    </Comp>;
