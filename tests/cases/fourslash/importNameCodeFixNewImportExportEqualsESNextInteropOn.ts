/// <reference path="fourslash.ts" />

// @EsModuleInterop: true
// @Module: es2015

// @Filename: /foo.d.ts
////declare module "foo" {
////  const foo: number;
////  export = foo;
////}

// @Filename: /index.ts
////[|foo|]

goTo.file('/index.ts');
verify.importFixAtPosition([`import foo from "foo";

foo`]);
