/// <reference path="fourslash.ts" />

// @Filename: /foo.ts
////const a = () => {};
////export default a;

// @Filename: /test.ts
////[|foo|];

goTo.file("/test.ts");
verify.importFixAtPosition([`import foo from "./foo";

foo`]);
