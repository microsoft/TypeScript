/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export class A {}
//// export class B {}

// @Filename: /b.ts
//// import type { A } from './a';
//// new B

goTo.file('/b.ts');
verify.importFixAtPosition([`import { B, type A } from './a';
new B`]);
