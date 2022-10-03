/// <reference path='fourslash.ts'/>

// @importHelpers: true
// @filename: /a.ts
////export default () => {};

// @filename: /b.ts
////export default () => {};

// @filename: /test.ts
////import a from './a';
////[|b|];

goTo.file("/test.ts");
verify.importFixAtPosition([`import b from './b';
b`]);
