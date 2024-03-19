//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtension3.ts] ////

//// [foo.tsx]
export function foo() {
    return "";
}

//// [bar.mts]
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error, suggest adding ".jsx"


//// [foo.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    return "";
}
//// [bar.mjs]
export {};
