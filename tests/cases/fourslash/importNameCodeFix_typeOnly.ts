/// <reference path="fourslash.ts" />

// @importsNotUsedAsValues: error

// @Filename: types.ts
////export class A {}

// @Filename: index.ts
////const a: /**/A

goTo.marker("");
verify.importFixAtPosition([
`import type { A } from "./types";

const a: A`
]);
