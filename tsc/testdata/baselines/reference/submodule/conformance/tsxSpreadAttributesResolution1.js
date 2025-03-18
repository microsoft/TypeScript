//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution1.tsx] ////

//// [file.tsx]
import React = require('react');

class Poisoned extends React.Component<{}, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj = {};

// OK
let p = <Poisoned {...obj} />;
let y = <Poisoned />;


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
let p = <Poisoned {...obj}/>;
let y = <Poisoned />;
