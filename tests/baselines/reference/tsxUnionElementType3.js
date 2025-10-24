//// [tests/cases/conformance/jsx/tsxUnionElementType3.tsx] ////

//// [file.tsx]
import React = require('react');

class RC1 extends React.Component<{x : number}, {}> {
    render() {
        return null;
    }
}

class RC2 extends React.Component<{ x: string }, {}> {
    render() {
        return null;
    }
    private method() { }
}

class RC3 extends React.Component<{}, {}> {
    render() {
        return null;
    }
}

class RC4 extends React.Component<{}, {}> {
    render() {
        return null;
    }
}

var EmptyRCComp = RC3 || RC4;
var PartRCComp = RC1 || RC4;
var RCComp = RC1 || RC2;
// OK
let a = <RCComp x="Hi" />;
let a1 = <EmptyRCComp />;
let a2 = <EmptyRCComp data-prop="hello" />;
let b = <PartRCComp />
let c = <PartRCComp data-extra="hello" />

//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class RC1 extends React.Component {
    render() {
        return null;
    }
}
class RC2 extends React.Component {
    render() {
        return null;
    }
    method() { }
}
class RC3 extends React.Component {
    render() {
        return null;
    }
}
class RC4 extends React.Component {
    render() {
        return null;
    }
}
var EmptyRCComp = RC3 || RC4;
var PartRCComp = RC1 || RC4;
var RCComp = RC1 || RC2;
// OK
let a = React.createElement(RCComp, { x: "Hi" });
let a1 = React.createElement(EmptyRCComp, null);
let a2 = React.createElement(EmptyRCComp, { "data-prop": "hello" });
let b = React.createElement(PartRCComp, null);
let c = React.createElement(PartRCComp, { "data-extra": "hello" });
