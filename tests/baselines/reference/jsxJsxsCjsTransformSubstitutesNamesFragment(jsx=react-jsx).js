//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformSubstitutesNamesFragment.tsx] ////

//// [jsxJsxsCjsTransformSubstitutesNamesFragment.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div></div>
</>

export {};

//// [jsxJsxsCjsTransformSubstitutesNamesFragment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/// <reference path="react16.d.ts" />
const a = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", {}), "text", (0, jsx_runtime_1.jsx)("div", {})] });
