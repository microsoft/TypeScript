/// <reference path="fourslash.ts" />

// @Filename: /lib.ts
////class Base { }
////export default Base;

// @Filename: /test.ts
////[|class Derived extends Base { }|]

goTo.file("/test.ts");
verify.importFixAtPosition([
`import Base from "./lib";

class Derived extends Base { }`,]);
