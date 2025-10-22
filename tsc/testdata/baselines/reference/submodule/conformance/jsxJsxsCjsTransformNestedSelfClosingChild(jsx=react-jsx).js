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
const jsx_runtime_1 = require("react/jsx-runtime");
console.log(jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx("div", {}) }));
console.log(jsx_runtime_1.jsxs("div", { children: [
        jsx_runtime_1.jsx("div", {}), jsx_runtime_1.jsx("div", {})
    ] }));
console.log(jsx_runtime_1.jsx("div", { children: [1, 2].map(i => jsx_runtime_1.jsx("div", { children: i }, i)) }));
