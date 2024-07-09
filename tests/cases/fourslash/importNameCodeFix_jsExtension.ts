/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @noLib: true
// @jsx: preserve

// @Filename: /a.ts
////export function a() {}

// @Filename: /b.ts
////export function b() {}

// @Filename: /c.tsx
////export function c() {}

// @Filename: /c.ts
////import * as g from "global"; // Global imports skipped
////import { a } from "./a.js";
////import { a as a2 } from "./a"; // Ignored, only the first relative import is considered
////b; c;

goTo.file("/c.ts");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import * as g from "global"; // Global imports skipped
import { a } from "./a.js";
import { a as a2 } from "./a"; // Ignored, only the first relative import is considered
import { b } from "./b.js";
import { c } from "./c.jsx";
b; c;`,
});
