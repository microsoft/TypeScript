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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function test(wrappedProps) {
    let MySFC = function (props) {
        return <>hello</>;
    };
    class MyComponent extends react_1.default.Component {
        render() {
            return <>hello</>;
        }
    }
    let x = <MySFC />;
    let y = <MyComponent />;
    let z = <MySFC {...wrappedProps}/>;
    let q = <MyComponent {...wrappedProps}/>;
}
