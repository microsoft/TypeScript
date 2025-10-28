//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformKeyProp.tsx] ////

//// [jsxJsxsCjsTransformKeyProp.tsx]
/// <reference path="/.lib/react16.d.ts" />
const props = { answer: 42 }
const a = <div key="foo" {...props}>text</div>;
const b = <div {...props} key="bar">text</div>;

export {};


//// [jsxJsxsCjsTransformKeyProp.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
const react_1 = require("react");
const _jsxFileName = "jsxJsxsCjsTransformKeyProp.tsx";
/// <reference path="react16.d.ts" />
const props = { answer: 42 };
const a = jsx_dev_runtime_1.jsxDEV("div", Object.assign({}, props, { children: "text" }), "foo", false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 10 }, this);
const b = react_1.createElement("div", Object.assign({}, props, { key: "bar" }), "text");
