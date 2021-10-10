//// [checkDashedJsxAttributes.tsx]
/// <reference path="/.lib/react16.d.ts" />

// Repro from #44797

import * as React from "react";

interface Props {
    foo: string;
    bar: number;
    [dataProp: `data-${string}`]: string;
}

function Yadda(props: Props) {
    return <div />;
}

let props: Props = {
    foo: "",
    bar: 0,
    "data-yadda": 42,
};

let x1 = <Yadda foo="hello" bar={42} data-yadda={42} />;



let propsObj1: Props = {
    foo: "",
    bar: 0,
    "data-yadda": 42,
};

// Should error on data-yadda
let x2 = <Yadda foo="hello" bar={42} data-yadda={42} />;

/////////

let propsObj2 = {
    foo: "",
    bar: 0,
    "data-yadda": 42,
};

// Should error on data-yadda
let y = <Yadda {...propsObj2} />

propsObj1 = propsObj2;

//// [checkDashedJsxAttributes.js]
"use strict";
/// <reference path="react16.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// Repro from #44797
var React = require("react");
function Yadda(props) {
    return React.createElement("div", null);
}
var props = {
    foo: "",
    bar: 0,
    "data-yadda": 42
};
var x1 = React.createElement(Yadda, { foo: "hello", bar: 42, "data-yadda": 42 });
var propsObj1 = {
    foo: "",
    bar: 0,
    "data-yadda": 42
};
// Should error on data-yadda
var x2 = React.createElement(Yadda, { foo: "hello", bar: 42, "data-yadda": 42 });
/////////
var propsObj2 = {
    foo: "",
    bar: 0,
    "data-yadda": 42
};
// Should error on data-yadda
var y = React.createElement(Yadda, __assign({}, propsObj2));
propsObj1 = propsObj2;
