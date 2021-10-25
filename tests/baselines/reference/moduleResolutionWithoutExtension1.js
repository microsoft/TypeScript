//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtension1.ts] ////

//// [foo.mts]
export function foo() {
    return "";
}

//// [bar.mts]
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error, suggest adding ".mjs"
import { baz } from "./baz"; // should also error, no extension suggestion
foo;
baz;


//// [foo.mjs]
export function foo() {
    return "";
}
//// [bar.mjs]
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error, suggest adding ".mjs"
import { baz } from "./baz"; // should also error, no extension suggestion
foo;
baz;
