//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformCustomImport.tsx] ////

//// [jsxJsxsCjsTransformCustomImport.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};

//// [jsxJsxsCjsTransformCustomImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("preact/jsx-runtime");
/// <reference path="react16.d.ts" />
var a = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", {}), "text", (0, jsx_runtime_1.jsx)("div", { className: "foo" })] });
