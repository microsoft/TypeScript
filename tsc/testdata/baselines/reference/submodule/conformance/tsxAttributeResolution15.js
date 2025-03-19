//// [tests/cases/conformance/jsx/tsxAttributeResolution15.tsx] ////

//// [file.tsx]
import React = require('react');

class BigGreeter extends React.Component<{ }, {}> {
    render() {
        return <div>Default hi</div>;
    }
    greeting: string;
}

// Error
let a = <BigGreeter prop1="hello" />

// OK
let b = <BigGreeter ref={(input) => { this.textInput = input; }} />
let c = <BigGreeter data-extra="hi" />

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class BigGreeter extends React.Component {
    render() {
        return <div>Default hi</div>;
    }
    greeting;
}
// Error
let a = <BigGreeter prop1="hello"/>;
// OK
let b = <BigGreeter ref={(input) => { this.textInput = input; }}/>;
let c = <BigGreeter data-extra="hi"/>;
