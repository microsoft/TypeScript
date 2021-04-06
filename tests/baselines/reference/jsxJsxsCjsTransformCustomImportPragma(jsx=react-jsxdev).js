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
var jsx_dev_runtime_1 = require("preact/jsx-dev-runtime");
var _jsxFileName = "tests/cases/conformance/jsx/jsxs/preact.tsx";
/// <reference path="react16.d.ts" />
/* @jsxImportSource preact */
var a = (0, jsx_dev_runtime_1.jsxDEV)(jsx_dev_runtime_1.Fragment, { children: [(0, jsx_dev_runtime_1.jsxDEV)("p", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 3 }, this), "text", (0, jsx_dev_runtime_1.jsxDEV)("div", { className: "foo" }, void 0, false, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 3 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 10 }, this);
//// [react.js]
"use strict";
exports.__esModule = true;
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "tests/cases/conformance/jsx/jsxs/react.tsx";
/// <reference path="react16.d.ts" />
/* @jsxImportSource react */
require("./preact");
var a = (0, jsx_dev_runtime_1.jsxDEV)(jsx_dev_runtime_1.Fragment, { children: [(0, jsx_dev_runtime_1.jsxDEV)("p", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 3 }, this), "text", (0, jsx_dev_runtime_1.jsxDEV)("div", { className: "foo" }, void 0, false, { fileName: _jsxFileName, lineNumber: 7, columnNumber: 3 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 10 }, this);
