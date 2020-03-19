//// [errorSpanForUnclosedJsxTag.tsx]
import React from "react";

let Foo = {
  Bar() {}
}

let Baz = () => {}

let x = <    Foo.Bar >Hello

let y = <   Baz >Hello

//// [errorSpanForUnclosedJsxTag.js]
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Foo = {
    Bar: function () { }
};
var Baz = function () { };
var x = react_1["default"].createElement(Foo.Bar, null,
    "Hello let y = ",
    react_1["default"].createElement(Baz, null, "Hello"));
