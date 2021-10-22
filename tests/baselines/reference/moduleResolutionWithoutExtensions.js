//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtensions.ts] ////

//// [foo.mts]
export function foo() {
    return "";
}

//// [bar.mts]
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error
import { baz } from "./baz"; // should also error
foo;
baz;


//// [foo.mjs]
export function foo() {
    return "";
}
//// [bar.mjs]
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error
import { baz } from "./baz"; // should also error
foo;
baz;
