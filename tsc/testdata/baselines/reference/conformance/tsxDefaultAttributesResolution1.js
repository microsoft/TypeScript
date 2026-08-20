//// [tests/cases/conformance/jsx/tsxDefaultAttributesResolution1.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface Prop {
    x: boolean;
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
/// <reference path="/.lib/react.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Poisoned extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
// OK
let p = <Poisoned x/>;
