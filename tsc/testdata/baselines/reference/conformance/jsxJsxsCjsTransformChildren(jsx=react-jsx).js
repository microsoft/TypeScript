//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformChildren.tsx] ////

//// [jsxJsxsCjsTransformChildren.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <div>text</div>;

export {};


//// [jsxJsxsCjsTransformChildren.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/// <reference path="/.lib/react16.d.ts" />
const a = (0, jsx_runtime_1.jsx)("div", { children: "text" });
