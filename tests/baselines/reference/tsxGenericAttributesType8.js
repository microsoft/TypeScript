//// [file.tsx]
import React = require('react');

declare function Component<T>(props: T) : JSX.Element;
const decorator = function <U>(props: U) {
    return <Component {...props} />;
}

const decorator1 = function <U extends {x: string}>(props: U) {
    return <Component {...props} />;
}

//// [file.jsx]
"use strict";
exports.__esModule = true;
var React = require("react");
var decorator = function (props) {
    return <Component {...props}/>;
};
var decorator1 = function (props) {
    return <Component {...props}/>;
};
