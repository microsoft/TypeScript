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
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
console.log((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", {}, void 0) }, void 0));
console.log((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)("div", {}, void 0)] }, void 0));
console.log((0, jsx_runtime_1.jsx)("div", { children: [1, 2].map(function (i) { return (0, jsx_runtime_1.jsx)("div", { children: i }, i); }) }, void 0));
