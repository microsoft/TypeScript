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
import { jsx as _jsx } from "react/jsx-runtime";
function Bar() {
    return _jsx("div", {});
}
export function Foo() {
    return _jsx(Bar, {});
}
