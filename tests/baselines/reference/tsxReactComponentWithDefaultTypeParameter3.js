//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P extends Prop> extends React.Component<P, {}> {
    internalProp: P;
}

// OK: we fille in missing type argument with empty object
let x1 = <MyComp />

// Error
let x = <MyComp a={10} b="hi" />
let x2 = <MyComp a="hi"/>

//// [file.jsx]
"use strict";
exports.__esModule = true;
var React = require("react");
// OK: we fille in missing type argument with empty object
var x1 = <MyComp />;
// Error
var x = <MyComp a={10} b="hi"/>;
var x2 = <MyComp a="hi"/>;
