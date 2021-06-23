//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformCustomImportPragma.tsx] ////

//// [preact.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource preact */
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};
//// [react.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource react */
import "./preact";
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};

//// [preact.js]
"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("preact/jsx-runtime");
/// <reference path="react16.d.ts" />
/* @jsxImportSource preact */
var a = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", {}, void 0), "text", (0, jsx_runtime_1.jsx)("div", { className: "foo" }, void 0)] }, void 0);
//// [react.js]
"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
/// <reference path="react16.d.ts" />
/* @jsxImportSource react */
require("./preact");
var a = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", {}, void 0), "text", (0, jsx_runtime_1.jsx)("div", { className: "foo" }, void 0)] }, void 0);
