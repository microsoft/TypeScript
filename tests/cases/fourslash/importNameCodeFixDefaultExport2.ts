/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /lib.js
////class Base { }
////export default Base;

// @Filename: /test.js
////[|class Derived extends Base { }|]

goTo.file("/test.js");
verify.importFixAtPosition([
`// @ts-ignore
class Derived extends Base { }`,
`// @ts-nocheck
class Derived extends Base { }`,
`import Base from "./lib";

class Derived extends Base { }`,]);
