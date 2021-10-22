// @moduleResolution: node12
// @module: node12

// @filename: /src/foo.mts
export function foo() {
    return "";
}

// Extensionless relative import in an ES module
// @Filename: /src/bar.mts
import { foo } from "./foo";
import { baz } from "./baz";
foo;
baz;
