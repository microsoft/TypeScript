//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution12.tsx] ////

//// [file.tsx]
import React = require('react');

const obj = {};
const obj1: {x: 2} = {
    x: 2
}
const obj3: {y: false, overwrite: string} = {
    y: false,
    overwrite: "hi"
}

interface Prop {
    x: 2
    y: false
    overwrite: string
}

class OverWriteAttr extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

let anyobj: any;

// Error
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1} />
let x1 = <OverWriteAttr overwrite="hi" {...obj1} x={3} {...{y: true}} />
let x2 = <OverWriteAttr {...anyobj} x={3} />
let x3 = <OverWriteAttr overwrite="hi" {...obj1} {...{y: true}} />



//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const obj = {};
const obj1 = {
    x: 2
};
const obj3 = {
    y: false,
    overwrite: "hi"
};
class OverWriteAttr extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
let anyobj;
// Error
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1}/>;
let x1 = <OverWriteAttr overwrite="hi" {...obj1} x={3} {...{ y: true }}/>;
let x2 = <OverWriteAttr {...anyobj} x={3}/>;
let x3 = <OverWriteAttr overwrite="hi" {...obj1} {...{ y: true }}/>;
