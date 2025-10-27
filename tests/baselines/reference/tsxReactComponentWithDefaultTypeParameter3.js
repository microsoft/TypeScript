//// [tests/cases/conformance/jsx/tsxReactComponentWithDefaultTypeParameter3.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P extends Prop> extends React.Component<P, {}> {
    internalProp: P;
}

// Error
let x1 = <MyComp />

// OK
let x = <MyComp a={10} b="hi" />

// Error
let x2 = <MyComp a="hi"/>

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// Error
let x1 = <MyComp />;
// OK
let x = <MyComp a={10} b="hi"/>;
// Error
let x2 = <MyComp a="hi"/>;
