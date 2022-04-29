//// [jsxIntrinsicUnions.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

const El = Math.random() ? 'h1' : 'h2';

const tag = <El className="ok" key="key">{"Title"}</El>;


//// [jsxIntrinsicUnions.js]
"use strict";
/// <reference path="react16.d.ts" />
exports.__esModule = true;
var React = require("react");
var El = Math.random() ? 'h1' : 'h2';
var tag = React.createElement(El, { className: "ok", key: "key" }, "Title");
