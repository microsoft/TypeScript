//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution2.tsx] ////

//// [file.tsx]
import React = require('react');

interface PoisonedProp {
    x: string;
    y: "2";
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj = {};

// OK
<Poisoned {...{x: "ok", y: "2"}} />;

// Error
let p = <Poisoned {...obj} />;
let y = <Poisoned />;
let z = <Poisoned x y/>;
let w = <Poisoned {...{x: 5, y: "2"}}/>;
let w1 = <Poisoned {...{x: 5, y: "2"}} X="hi" />;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Poisoned extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
const obj = {};
<Poisoned {...{ x: "ok", y: "2" }}/>;
let p = <Poisoned {...obj}/>;
let y = <Poisoned />;
let z = <Poisoned x y/>;
let w = <Poisoned {...{ x: 5, y: "2" }}/>;
let w1 = <Poisoned {...{ x: 5, y: "2" }} X="hi"/>;
