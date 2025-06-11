//// [tests/cases/compiler/reactImportUnusedInNewJSXEmit.tsx] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
const jsx_runtime_1 = require("react/jsx-runtime");
function Bar() {
    return jsx_runtime_1.jsx("div", {});
}
function Foo() {
    return jsx_runtime_1.jsx(Bar, {});
}
