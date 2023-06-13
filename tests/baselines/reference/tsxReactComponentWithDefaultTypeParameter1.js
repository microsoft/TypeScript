//// [tests/cases/conformance/jsx/tsxReactComponentWithDefaultTypeParameter1.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P = Prop> extends React.Component<P, {}> {
    internalProp: P;
}

let x = <MyComp a={10} b="hi" />

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var x = <MyComp a={10} b="hi"/>;
