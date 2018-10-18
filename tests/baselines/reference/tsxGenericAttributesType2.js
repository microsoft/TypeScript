//// [file.tsx]
import React = require('react');

const decorator4 = function <T extends { x: number }>(Component: React.StatelessComponent<T>): React.StatelessComponent<T> {
    return (props) => <Component {...props} y={"blah"} ></Component>
};

//// [file.jsx]
"use strict";
exports.__esModule = true;
var React = require("react");
var decorator4 = function (Component) {
    return function (props) { return <Component {...props} y={"blah"}></Component>; };
};
