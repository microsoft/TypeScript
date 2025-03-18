//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution11.tsx] ////

//// [file.tsx]
import React = require('react');

const obj = {};
const obj1: { x: 2 } = {
    x: 2
}
const obj3: {y: true, overwrite: string } = {
    y: true,
    overwrite: "hi"
}

interface Prop {
    x: 2
    y: true
    overwrite: string
}

class OverWriteAttr extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

let anyobj: any;
// OK
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1} />
let x1 = <OverWriteAttr {...obj1} {...obj3} />
let x2 = <OverWriteAttr x={3} overwrite="hi" {...obj1} {...{y: true}} />
let x3 = <OverWriteAttr overwrite="hi" {...obj1} x={3} {...{y: true, x: 2, overwrite:"world"}} />
let x4 = <OverWriteAttr {...{x: 2}} {...{overwrite: "world"}} {...{y: true}} />
let x5 = <OverWriteAttr {...anyobj} />

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const obj = {};
const obj1 = {
    x: 2
};
const obj3 = {
    y: true,
    overwrite: "hi"
};
class OverWriteAttr extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
let anyobj;
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1}/>;
let x1 = <OverWriteAttr {...obj1} {...obj3}/>;
let x2 = <OverWriteAttr x={3} overwrite="hi" {...obj1} {...{ y: true }}/>;
let x3 = <OverWriteAttr overwrite="hi" {...obj1} x={3} {...{ y: true, x: 2, overwrite: "world" }}/>;
let x4 = <OverWriteAttr {...{ x: 2 }} {...{ overwrite: "world" }} {...{ y: true }}/>;
let x5 = <OverWriteAttr {...anyobj}/>;
