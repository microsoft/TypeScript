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
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "index.tsx";
function Bar() {
    return _jsxDEV("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 9 }, this);
}
export function Foo() {
    return _jsxDEV(Bar, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 10, columnNumber: 9 }, this);
}
