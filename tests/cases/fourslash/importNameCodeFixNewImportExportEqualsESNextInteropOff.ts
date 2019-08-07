/// <reference path="fourslash.ts" />

// @Module: esnext

// @Filename: /foo.d.ts
////declare module "foo" {
////  const foo: number;
////  export = foo;
////}

// @Filename: /index.ts
////foo

goTo.file('/index.ts');
verify.importFixAtPosition([`import foo = require("foo");

foo`]);
