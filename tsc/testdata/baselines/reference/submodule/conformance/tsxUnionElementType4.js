//// [tests/cases/conformance/jsx/tsxUnionElementType4.tsx] ////

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

var RCComp = RC1 || RC2;
var EmptyRCComp = RC3 || RC4;
var PartRCComp = RC1 || RC4;
// Error
let a = <RCComp x />;
let b = <PartRCComp x={10} />
let c = <EmptyRCComp prop />;


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
var RCComp = RC1 || RC2;
var EmptyRCComp = RC3 || RC4;
var PartRCComp = RC1 || RC4;
let a = <RCComp x/>;
let b = <PartRCComp x={10}/>;
let c = <EmptyRCComp prop/>;
