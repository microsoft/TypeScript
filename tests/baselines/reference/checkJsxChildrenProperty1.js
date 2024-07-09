//// [tests/cases/conformance/jsx/checkJsxChildrenProperty1.tsx] ////

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

// OK
let k = <Comp a={10} b="hi" children ="lol" />;
let k1 =
    <Comp a={10} b="hi">
        hi hi hi!
    </Comp>;
let k2 =
    <Comp a={10} b="hi">
        <div>hi hi hi!</div>
    </Comp>;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Comp(p) {
    return <div>{p.b}</div>;
}
// OK
var k = <Comp a={10} b="hi" children="lol"/>;
var k1 = <Comp a={10} b="hi">
        hi hi hi!
    </Comp>;
var k2 = <Comp a={10} b="hi">
        <div>hi hi hi!</div>
    </Comp>;
