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
const jsx_dev_runtime_1 = require("preact/jsx-dev-runtime");
const preact_1 = require("preact");
const _jsxFileName = "jsxJsxsCjsTransformKeyPropCustomImport.tsx";
/// <reference path="react16.d.ts" />
const props = { answer: 42 };
const a = jsx_dev_runtime_1.jsxDEV("div", Object.assign({}, props, { children: "text" }), "foo", false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 10 }, this);
const b = preact_1.createElement("div", Object.assign({}, props, { key: "bar" }), "text");
