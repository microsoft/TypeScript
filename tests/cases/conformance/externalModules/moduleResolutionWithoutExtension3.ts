// @moduleResolution: nodenext
// @module: node18,node20,nodenext
// @jsx: preserve

// @filename: /src/foo.tsx
export function foo() {
    return "";
}

// @filename: /src/bar.mts
// Extensionless relative path ES import in an ES module
import { foo } from "./foo"; // should error, suggest adding ".jsx"
