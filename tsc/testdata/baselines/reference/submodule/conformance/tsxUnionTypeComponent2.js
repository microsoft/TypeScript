//// [tests/cases/conformance/jsx/tsxUnionTypeComponent2.tsx] ////

//// [file.tsx]
import React = require('react');

type Invalid1 = React.ComponentClass<any> | number;

const X: Invalid1 = 1;

<X />;




//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const X = 1;
<X />;
