//// [index.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from "react";

function Bar() {
  return <div />;
}

export function Foo() {
  return <Bar />;
}

//// [index.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "tests/cases/compiler/index.tsx";
function Bar() {
    return (0, jsx_dev_runtime_1.jsxDEV)("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 9 }, this);
}
function Foo() {
    return (0, jsx_dev_runtime_1.jsxDEV)(Bar, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 10, columnNumber: 9 }, this);
}
exports.Foo = Foo;
