/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export const foo = () => console.log('Hello world!');
////export const bar = () => console.log('Hello world!');

// @filename: /b.ts
////import { foo as foo, bar as bar } from "./a";
////foo();
////bar();

goTo.file("/b.ts");

verify.codeFix({
    description: 'Simplify redundant import \'foo\'',
    index: 0,
    newFileContent:
`import { foo, bar as bar } from "./a";
foo();
bar();`
});
  
verify.codeFixAll({
    fixAllDescription: ts.Diagnostics.Simplify_all_redundant_imports.message,
    fixId: "removeUnnecessaryNamedImport",
    newFileContent:
`import { foo, bar } from "./a";
foo();
bar();`
});
  