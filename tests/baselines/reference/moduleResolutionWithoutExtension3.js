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
exports.foo = void 0;
function foo() {
    return "";
}
exports.foo = foo;
//// [bar.mjs]
export {};
