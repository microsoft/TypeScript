///<reference path="fourslash.ts"/>

// @checkJs: true
// @Filename: /first.ts
//// export function foo() {
////     return 1;
//// }
// @Filename: /index.js
//// const { foo } = require("./first");
//// function bar() {
////     return 2;
//// }
////

verify.getImports('/index.js', ['/first.ts'])
