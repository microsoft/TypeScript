//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponentWithDefaultTypeParameter2.tsx] ////

//// [file.tsx]
import React = require('react')

interface MyComponentProp {
    values: string;
}

function MyComponent1<T extends MyComponentProp>(attr: T) {
    return <div>attr.values</div>
}


// Error
let i1 = <MyComponent1 values={5}/>;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function MyComponent1(attr) {
    return <div>attr.values</div>;
}
// Error
let i1 = <MyComponent1 values={5}/>;
