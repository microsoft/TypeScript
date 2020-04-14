/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /foo.d.ts
////declare module "foo" {
////  const foo: number;
////  export = foo;
////}

// @Filename: /a.js
////foo

// @Filename: /b.js
////import "";
////
////foo

// 1. JavaScript should default to 'const ... = require...' without compiler flags set
goTo.file('/a.js');
verify.importFixAtPosition([`const foo = require("foo");

foo`]);

// 2. If there are any ImportDeclarations, assume a default import is fine
goTo.file('/b.js');
verify.importFixAtPosition([`import "";
import foo from "foo";

foo`]);
