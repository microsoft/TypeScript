//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution9.tsx] ////

//// [file.tsx]
import React = require('react');

interface OptionProp {
    x?: 2
    y?: boolean
}

class Opt extends React.Component<OptionProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj: OptionProp = {};
const obj1: OptionProp = {
    x: 2
}

// OK
let p = <Opt />;
let y = <Opt {...obj} />;
let y1 = <Opt {...obj1} />;
let y2 = <Opt {...obj1} y/>;
let y3 = <Opt x={2} />;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Opt extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
const obj = {};
const obj1 = {
    x: 2
};
let p = <Opt />;
let y = <Opt {...obj}/>;
let y1 = <Opt {...obj1}/>;
let y2 = <Opt {...obj1} y/>;
let y3 = <Opt x={2}/>;
