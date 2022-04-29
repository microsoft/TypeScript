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
exports.__esModule = true;
var React = require("react");
var decorator = function (Component) {
    return function (props) { return <Component {...props}></Component>; };
};
var decorator2 = function (Component) {
    return function (props) { return <Component {...props} x={2}></Component>; };
};
var decorator3 = function (Component) {
    return function (props) { return <Component x={2} {...props}></Component>; };
};
