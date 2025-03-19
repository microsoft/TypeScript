//// [tests/cases/conformance/jsx/tsxDefaultAttributesResolution2.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    x: true;
}
class Poisoned extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// OK
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
// OK
let p = <Poisoned x/>;
