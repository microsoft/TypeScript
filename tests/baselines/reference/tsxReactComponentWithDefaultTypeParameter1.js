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
exports.__esModule = true;
var React = require("react");
var x = <MyComp a={10} b="hi"/>;
