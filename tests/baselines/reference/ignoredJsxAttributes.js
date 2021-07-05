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
/// <reference path="react16.d.ts" />
exports.__esModule = true;
// Repro from #44797
var React = require("react");
var props = {
    foo: "",
    "data-yadda": 42
};
var x1 = React.createElement(Yadda, { foo: "hello", "data-yadda": 42 });
var x2 = React.createElement(Yadda, { bar: "hello", "data-yadda": 42 }); // Error
