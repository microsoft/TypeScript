/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export class A {}
//// export class B {}
//// export class C {}
//// export class D {}
//// export class E {}
//// export class F {}
//// export class G {}

// @Filename: /b.ts
//// import type { A, C, D, E, G } from './a';
//// type Z = B | A;
//// new F;

// @Filename: /c.ts
//// import type { A, C, D, E, G } from './a';
//// type Z = B | A;
//// type Y = F;

goTo.file('/b.ts');
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent: 
`import { B, F, type A, type C, type D, type E, type G } from './a';
type Z = B | A;
new F;`
});

goTo.file('/c.ts');
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent: 
`import type { A, B, C, D, E, F, G } from './a';
type Z = B | A;
type Y = F;`
});


