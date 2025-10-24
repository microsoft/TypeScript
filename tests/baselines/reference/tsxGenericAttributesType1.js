//// [tests/cases/conformance/jsx/tsxGenericAttributesType1.tsx] ////

//// [file.tsx]
import React = require('react');

const decorator = function <T>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props}></Component>
};

const decorator2 = function <T extends { x: number }>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props} x={2} ></Component>
};

const decorator3 = function <T extends { x: number }, U extends { x: number } >(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component x={2} {...props} ></Component>
};

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const decorator = function (Component) {
    return (props) => <Component {...props}></Component>;
};
const decorator2 = function (Component) {
    return (props) => <Component {...props} x={2}></Component>;
};
const decorator3 = function (Component) {
    return (props) => <Component x={2} {...props}></Component>;
};
