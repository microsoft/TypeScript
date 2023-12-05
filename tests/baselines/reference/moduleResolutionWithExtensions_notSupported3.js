//// [tests/cases/compiler/moduleResolutionWithExtensions_notSupported3.ts] ////

//// [jsx.jsx]
// If we have "--jsx" set and not "--allowJs", it's an implicit-any module.


//// [a.ts]
import jsx from "./jsx";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
