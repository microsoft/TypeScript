//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformSubstitutesNames.tsx] ////

//// [jsxJsxsCjsTransformSubstitutesNames.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <div></div>

export {};

//// [jsxJsxsCjsTransformSubstitutesNames.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/// <reference path="react16.d.ts" />
var a = (0, jsx_runtime_1.jsx)("div", {});
