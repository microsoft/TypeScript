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
const jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
const _jsxFileName = "jsxJsxsCjsTransformSubstitutesNamesFragment.tsx";
/// <reference path="/.lib/react16.d.ts" />
const a = (0, jsx_dev_runtime_1.jsxDEV)(jsx_dev_runtime_1.Fragment, { children: [(0, jsx_dev_runtime_1.jsxDEV)("p", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 3 }, this), "text", (0, jsx_dev_runtime_1.jsxDEV)("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 3 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 2, columnNumber: 11 }, this);
