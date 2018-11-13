/// <reference path='fourslash.ts' />

// Tests that the import fix is returned first.

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const foof = 0;
////foo;

goTo.file("/b.ts");
verify.codeFixAvailable([
    { description: `Import 'foo' from module "./a"` },
    { description: "Change spelling to 'foof'" },
]);
