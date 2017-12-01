//// [tests/cases/compiler/moduleResolutionWithExtensions_notSupported2.ts] ////

//// [jsx.jsx]
// Test the error message if we have `--allowJs` but not `--jsx`.


//// [a.ts]
import jsx from "./jsx";


//// [a.js]
"use strict";
exports.__esModule = true;
