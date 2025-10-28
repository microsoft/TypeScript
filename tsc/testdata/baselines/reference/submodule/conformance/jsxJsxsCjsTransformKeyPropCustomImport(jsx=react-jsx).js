//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformKeyPropCustomImport.tsx] ////

//// [jsxJsxsCjsTransformKeyPropCustomImport.tsx]
/// <reference path="/.lib/react16.d.ts" />
const props = { answer: 42 }
const a = <div key="foo" {...props}>text</div>;
const b = <div {...props} key="bar">text</div>;

export {};


//// [jsxJsxsCjsTransformKeyPropCustomImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("preact/jsx-runtime");
const preact_1 = require("preact");
/// <reference path="react16.d.ts" />
const props = { answer: 42 };
const a = jsx_runtime_1.jsx("div", Object.assign({}, props, { children: "text" }), "foo");
const b = preact_1.createElement("div", Object.assign({}, props, { key: "bar" }), "text");
