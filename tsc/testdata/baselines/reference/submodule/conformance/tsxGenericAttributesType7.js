//// [tests/cases/conformance/jsx/tsxGenericAttributesType7.tsx] ////

//// [file.tsx]
import React = require('react');

declare function Component<T>(props: T) : JSX.Element;
const decorator = function <U>(props: U) {
    return <Component {...props} />;
}

const decorator1 = function <U extends {x: string}>(props: U) {
    return <Component {...props} x="hi"/>;
}

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const decorator = function (props) {
    return <Component {...props}/>;
};
const decorator1 = function (props) {
    return <Component {...props} x="hi"/>;
};
