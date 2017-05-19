//// [tests/cases/compiler/moduleResolutionWithExtensions_notSupported3.ts] ////

//// [jsx.jsx]
// Test the error message if we have `--jsx` but not `--allowJw`.


//// [a.ts]
import jsx from "./jsx";


//// [a.js]
"use strict";
exports.__esModule = true;
