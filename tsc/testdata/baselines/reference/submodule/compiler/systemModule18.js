//// [tests/cases/compiler/systemModule18.ts] ////

//// [react.ts]
export function createElement() {}
export function lazy() {}
export function useState() {}

//// [index.ts]
export import React = require("./react.js");


//// [react.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = createElement;
exports.lazy = lazy;
exports.useState = useState;
function createElement() { }
function lazy() { }
function useState() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.React = require("./react.js");
