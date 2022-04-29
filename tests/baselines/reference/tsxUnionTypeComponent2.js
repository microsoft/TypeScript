//// [file.tsx]
import React = require('react');

type Invalid1 = React.ComponentClass<any> | number;

const X: Invalid1 = 1;

<X />;




//// [file.js]
"use strict";
exports.__esModule = true;
var React = require("react");
var X = 1;
React.createElement(X, null);
