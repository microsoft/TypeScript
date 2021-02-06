/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a = 'a';

// @Filename: /b.ts
////import "./anything.json";
////
////a/**/

goTo.file("/b.ts");
verify.importFixAtPosition([`import { a } from "./a";
import "./anything.json";

a`]);
