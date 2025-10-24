//// [tests/cases/compiler/jsxIntrinsicUnions.tsx] ////

//// [jsxIntrinsicUnions.tsx]
/// <reference path="/.lib/react16.d.ts" />

import * as React from "react";

const El = Math.random() ? 'h1' : 'h2';

const tag = <El className="ok" key="key">{"Title"}</El>;


//// [jsxIntrinsicUnions.js]
"use strict";
/// <reference path="react16.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const El = Math.random() ? 'h1' : 'h2';
const tag = React.createElement(El, { className: "ok", key: "key" }, "Title");
