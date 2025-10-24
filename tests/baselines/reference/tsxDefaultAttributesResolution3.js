//// [tests/cases/conformance/jsx/tsxDefaultAttributesResolution3.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    x: false;
}
class Poisoned extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// Error
let p = <Poisoned x/>;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Poisoned extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
// Error
let p = <Poisoned x/>;
