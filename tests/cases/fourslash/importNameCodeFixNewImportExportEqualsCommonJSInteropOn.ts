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
////import bar from "bar";
////
////foo

// @Filename: /b.ts
////foo

// @Filename: /c.ts
////import es from "es";
////
////foo

// 1. Should match existing imports of 'export ='
goTo.file('/a.ts');
verify.importFixAtPosition([`import bar from "bar";
import foo from "foo";

foo`]);

// 2. Should default to ImportEquals
goTo.file('/b.ts');
verify.importFixAtPosition([`import foo = require("foo");

foo`]);

// 3. Importing an 'export default' doesn’t count toward the usage heursitic
goTo.file('/c.ts');
verify.importFixAtPosition([`import es from "es";
import foo = require("foo");

foo`]);