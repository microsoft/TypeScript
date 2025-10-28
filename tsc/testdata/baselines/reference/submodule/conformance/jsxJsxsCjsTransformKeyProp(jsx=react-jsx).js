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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/// <reference path="react16.d.ts" />
const props = { answer: 42 };
const a = jsx_runtime_1.jsx("div", Object.assign({}, props, { children: "text" }), "foo");
const b = react_1.createElement("div", Object.assign({}, props, { key: "bar" }), "text");
