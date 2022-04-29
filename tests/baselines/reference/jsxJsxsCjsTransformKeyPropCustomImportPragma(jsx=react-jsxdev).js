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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var preact_1 = require("preact");
var jsx_dev_runtime_1 = require("preact/jsx-dev-runtime");
var _jsxFileName = "tests/cases/conformance/jsx/jsxs/preact.tsx";
/// <reference path="react16.d.ts" />
/* @jsxImportSource preact */
var props = { answer: 42 };
var a = (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({}, props, { children: "text" }), "foo", false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 10 }, this);
var b = (0, preact_1.createElement)("div", __assign({}, props, { key: "bar" }), "text");
//// [react.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "tests/cases/conformance/jsx/jsxs/react.tsx";
/// <reference path="react16.d.ts" />
/* @jsxImportSource react */
require("./preact");
var props2 = { answer: 42 };
var a2 = (0, jsx_dev_runtime_1.jsxDEV)("div", __assign({}, props2, { children: "text" }), "foo", false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 11 }, this);
var b2 = (0, react_1.createElement)("div", __assign({}, props2, { key: "bar" }), "text");
