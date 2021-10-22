//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtensions.ts] ////

//// [foo.mts]
export function foo() {
    return "";
}

// Extensionless relative import in an ES module
//// [bar.mts]
import { foo } from "./foo";
import { baz } from "./baz";
foo;
baz;


//// [foo.mjs]
export function foo() {
    return "";
}
// Extensionless relative import in an ES module
//// [bar.mjs]
import { foo } from "./foo";
import { baz } from "./baz";
foo;
baz;
