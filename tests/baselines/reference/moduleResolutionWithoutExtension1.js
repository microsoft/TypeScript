//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtension1.ts] ////

//// [foo.mts]
export function foo() {
    return "";
}

//// [bar.mts]
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error, suggest adding ".mjs"
import { baz } from "./baz"; // should error, ask for extension, no extension suggestion


//// [foo.mjs]
export function foo() {
    return "";
}
//// [bar.mjs]
export {};
