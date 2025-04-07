//// [tests/cases/compiler/ignoredJsxAttributes.tsx] ////

//// [ignoredJsxAttributes.tsx]
/// <reference path="/.lib/react16.d.ts" />

// Repro from #44797

import * as React from "react";

interface Props {
    foo: string;
    [dataProp: string]: string;
}

declare function Yadda(props: Props): JSX.Element;

let props: Props = {
    foo: "",
    "data-yadda": 42,  // Error
};

let x1 = <Yadda foo="hello" data-yadda={42}/>;
let x2 = <Yadda bar="hello" data-yadda={42}/>;  // Error


//// [ignoredJsxAttributes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
// Repro from #44797
const React = require("react");
let props = {
    foo: "",
    "data-yadda": 42, // Error
};
let x1 = <Yadda foo="hello" data-yadda={42}/>;
let x2 = <Yadda bar="hello" data-yadda={42}/>; // Error
