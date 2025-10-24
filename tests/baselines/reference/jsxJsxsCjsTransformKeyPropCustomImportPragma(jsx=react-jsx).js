//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformKeyPropCustomImportPragma.tsx] ////

//// [preact.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource preact */
const props = { answer: 42 }
const a = <div key="foo" {...props}>text</div>;
const b = <div {...props} key="bar">text</div>;

export {};

//// [react.tsx]
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource react */
import "./preact";
const props2 = { answer: 42 }
const a2 = <div key="foo" {...props2}>text</div>;
const b2 = <div {...props2} key="bar">text</div>;

export {};


//// [preact.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = require("preact");
const jsx_runtime_1 = require("preact/jsx-runtime");
/// <reference path="react16.d.ts" />
/* @jsxImportSource preact */
const props = { answer: 42 };
const a = (0, jsx_runtime_1.jsx)("div", Object.assign({}, props, { children: "text" }), "foo");
const b = (0, preact_1.createElement)("div", Object.assign({}, props, { key: "bar" }), "text");
//// [react.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
/// <reference path="react16.d.ts" />
/* @jsxImportSource react */
require("./preact");
const props2 = { answer: 42 };
const a2 = (0, jsx_runtime_1.jsx)("div", Object.assign({}, props2, { children: "text" }), "foo");
const b2 = (0, react_1.createElement)("div", Object.assign({}, props2, { key: "bar" }), "text");
