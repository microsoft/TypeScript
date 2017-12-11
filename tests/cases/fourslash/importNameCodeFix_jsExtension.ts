/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @noLib: true

// @Filename: /a.ts
////export function a() {}

// @Filename: /b.ts
////export function b() {}

// @Filename: /c.ts
////import { a } from "./a.js";
////[|b;|]

goTo.file("/c.ts");
verify.importFixAtPosition([
`import { b } from "./b.js";
b;`,
]);
