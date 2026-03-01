//// [tests/cases/compiler/moduleResolutionWithExtensions_notSupported.ts] ////

//// [tsx.tsx]

//// [jsx.jsx]

//// [js.js]

//// [a.ts]
import tsx from "./tsx"; // Not allowed.
import jsx from "./jsx"; // Not allowed.
import js from "./js"; // OK because it's an untyped module.


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
