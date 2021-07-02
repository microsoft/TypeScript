//// [ignoredJsxAttributes.tsx]
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
// Repro from #44797
exports.__esModule = true;
var React = require("react");
var props = {
    foo: "",
    "data-yadda": 42
};
var x1 = React.createElement(Yadda, { foo: "hello", "data-yadda": 42 });
var x2 = React.createElement(Yadda, { bar: "hello", "data-yadda": 42 }); // Error
