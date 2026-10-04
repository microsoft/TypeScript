//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution3.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface PoisonedProp {
    x: string;
    y: number;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj = {
    x: "hello world",
    y: 2
};

// OK
let p = <Poisoned {...obj} />;
let y = <Poisoned x="hi" y={2} />;

//// [file.jsx]
"use strict";
/// <reference path="/.lib/react.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Poisoned extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
const obj = {
    x: "hello world",
    y: 2
};
// OK
let p = <Poisoned {...obj}/>;
let y = <Poisoned x="hi" y={2}/>;
