/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a = 0;
////export default function foo() {};

// @Filename: /b.ts
////[|a;|]

// No fix for the default export because we already got one for the named export 'a'.
goTo.file("/b.ts");
verify.importFixAtPosition([`import { a } from "./a";

a;`]);
