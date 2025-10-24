//// [tests/cases/compiler/tsxNotUsingApparentTypeOfSFC.tsx] ////

//// [tsxNotUsingApparentTypeOfSFC.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

function test<P>(wrappedProps: P) {
    let MySFC = function(props: P) {
        return <>hello</>;
    };
    class MyComponent extends React.Component<P> {
        render() {
            return <>hello</>;
        }
    }
    let x = <MySFC />;  // should error
    let y = <MyComponent />;  // should error

    let z = <MySFC {...wrappedProps} /> // should work
    let q = <MyComponent {...wrappedProps} /> // should work
}

//// [tsxNotUsingApparentTypeOfSFC.js]
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function test(wrappedProps) {
    let MySFC = function (props) {
        return react_1.default.createElement(react_1.default.Fragment, null, "hello");
    };
    class MyComponent extends react_1.default.Component {
        render() {
            return react_1.default.createElement(react_1.default.Fragment, null, "hello");
        }
    }
    let x = react_1.default.createElement(MySFC, null); // should error
    let y = react_1.default.createElement(MyComponent, null); // should error
    let z = react_1.default.createElement(MySFC, __assign({}, wrappedProps)); // should work
    let q = react_1.default.createElement(MyComponent, __assign({}, wrappedProps)); // should work
}
