//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformSubstitutesNames.tsx] ////

//// [jsxJsxsCjsTransformSubstitutesNames.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <div></div>

export {};

//// [jsxJsxsCjsTransformSubstitutesNames.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/// <reference path="react16.d.ts" />
const a = jsx_runtime_1.jsx("div", {});
