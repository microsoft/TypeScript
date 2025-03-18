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
function Bar() {
    return <div />;
}
function Foo() {
    return <Bar />;
}
