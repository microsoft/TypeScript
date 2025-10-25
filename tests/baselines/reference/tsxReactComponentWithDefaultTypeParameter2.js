//// [tests/cases/conformance/jsx/tsxReactComponentWithDefaultTypeParameter2.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P = Prop> extends React.Component<P, {}> {
    internalProp: P;
}

let x = <MyComp />
let x1 = <MyComp a="hi"/>

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let x = <MyComp />;
let x1 = <MyComp a="hi"/>;
