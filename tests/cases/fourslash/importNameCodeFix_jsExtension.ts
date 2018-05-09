/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @noLib: true

// @Filename: /a.ts
////export function a() {}

// @Filename: /b.ts
////export function b() {}

// @Filename: /c.ts
////import * as g from "global"; // Global imports skipped
////import { a } from "./a.js";
////import { a as a2 } from "./a"; // Ignored, only the first relative import is considered
////b;

goTo.file("/c.ts");
verify.importFixAtPosition([
`import * as g from "global"; // Global imports skipped
import { a } from "./a.js";
import { a as a2 } from "./a"; // Ignored, only the first relative import is considered
import { b } from "./b.js";
b;`,
]);
