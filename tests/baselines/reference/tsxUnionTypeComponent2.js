//// [tests/cases/conformance/jsx/tsxUnionTypeComponent2.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

type Invalid1 = React.ComponentClass<any> | number;

const X: Invalid1 = 1;

<X />;




//// [file.js]
"use strict";
/// <reference path="/.lib/react.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var X = 1;
React.createElement(X, null);
