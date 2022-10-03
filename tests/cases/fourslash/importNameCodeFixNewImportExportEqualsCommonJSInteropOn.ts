/// <reference path="fourslash.ts" />

// @Module: commonjs
// @EsModuleInterop: true

// @Filename: /foo.d.ts
////declare module "bar" {
////  const bar: number;
////  export = bar;
////}
////declare module "foo" {
////  const foo: number;
////  export = foo;
////}
////declare module "es" {
////  const es = 0;
////  export default es;
////}

// @Filename: /a.ts
////import bar = require("bar");
////
////foo

// @Filename: /b.ts
////foo

// @Filename: /c.ts
////import es from "es";
////import bar = require("bar");
////
////foo

// 1. Should match existing imports of 'export ='
goTo.file('/a.ts');
verify.importFixAtPosition([`import bar = require("bar");
import foo = require("foo");

foo`]);

// 2. Should default to default import
goTo.file('/b.ts');
verify.importFixAtPosition([`import foo from "foo";

foo`]);

// 3. Importing an 'export default' doesn’t count toward the usage heursitic
goTo.file('/c.ts');
verify.importFixAtPosition([`import es from "es";
import bar = require("bar");
import foo = require("foo");

foo`]);