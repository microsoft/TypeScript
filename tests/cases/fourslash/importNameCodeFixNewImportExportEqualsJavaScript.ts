/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /foo.d.ts
////declare module "foo" {
////  const foo: number;
////  export = foo;
////}

// @Filename: /index.js
////[|foo|]

goTo.file('/index.js');
verify.importFixAtPosition([`import foo from "foo";

foo`]);
