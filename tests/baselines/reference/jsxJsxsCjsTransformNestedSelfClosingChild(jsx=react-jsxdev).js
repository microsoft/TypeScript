//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformNestedSelfClosingChild.tsx] ////

//// [jsxJsxsCjsTransformNestedSelfClosingChild.tsx]
/// <reference path="/.lib/react16.d.ts" />
import type * as React from 'react';

console.log(
  <div>
    <div />
  </div>
)

console.log(
  <div>
    <div />
    <div />
  </div>
)

console.log(
  <div>
    {[1, 2].map(i => <div key={i}>{i}</div>)}
  </div>
)

//// [jsxJsxsCjsTransformNestedSelfClosingChild.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
const _jsxFileName = "jsxJsxsCjsTransformNestedSelfClosingChild.tsx";
console.log((0, jsx_dev_runtime_1.jsxDEV)("div", { children: (0, jsx_dev_runtime_1.jsxDEV)("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 5 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 3 }, this));
console.log((0, jsx_dev_runtime_1.jsxDEV)("div", { children: [(0, jsx_dev_runtime_1.jsxDEV)("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 12, columnNumber: 5 }, this), (0, jsx_dev_runtime_1.jsxDEV)("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 13, columnNumber: 5 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 11, columnNumber: 3 }, this));
console.log((0, jsx_dev_runtime_1.jsxDEV)("div", { children: [1, 2].map(i => (0, jsx_dev_runtime_1.jsxDEV)("div", { children: i }, i, false, { fileName: _jsxFileName, lineNumber: 19, columnNumber: 22 }, this)) }, void 0, false, { fileName: _jsxFileName, lineNumber: 18, columnNumber: 3 }, this));
