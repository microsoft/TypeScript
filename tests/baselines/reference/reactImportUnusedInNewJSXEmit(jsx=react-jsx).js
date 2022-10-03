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
var jsx_runtime_1 = require("react/jsx-runtime");
function Bar() {
    return (0, jsx_runtime_1.jsx)("div", {});
}
function Foo() {
    return (0, jsx_runtime_1.jsx)(Bar, {});
}
exports.Foo = Foo;
