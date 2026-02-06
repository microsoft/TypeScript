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
const preact_1 = require("preact");
const jsx_runtime_1 = require("preact/jsx-runtime");
/// <reference path="/.lib/react16.d.ts" />
const props = { answer: 42 };
const a = (0, jsx_runtime_1.jsx)("div", Object.assign({}, props, { children: "text" }), "foo");
const b = (0, preact_1.createElement)("div", Object.assign({}, props, { key: "bar" }), "text");
