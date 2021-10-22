// @moduleResolution: node12
// @module: node12

// @filename: /src/foo.mts
export function foo() {
    return "";
}

// @filename: /src/bar.mts
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error
import { baz } from "./baz"; // should also error
foo;
baz;
