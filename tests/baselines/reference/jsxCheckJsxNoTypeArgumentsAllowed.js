//// [tests/cases/conformance/jsx/jsxCheckJsxNoTypeArgumentsAllowed.tsx] ////

//// [component.d.ts]
import * as React from "react";
export declare class MyComp<P> extends React.Component<P, {}> {
    internalProp: P;
}

export interface Prop {
    a: number,
    b: string
}

//// [file.jsx]
import { MyComp, Prop } from "./component";
import * as React from "react";

let x = <MyComp<Prop> a={10} b="hi" />; // error, no type arguments in js


//// [file.jsx]
"use strict";
exports.__esModule = true;
var component_1 = require("./component");
var React = require("react");
var x = <component_1.MyComp />, <Prop> a={10} b="hi" />; // error, no type arguments in js
</>;
