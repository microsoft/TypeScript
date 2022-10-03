// @Filename: foo1.ts
var x = 10;
export = typeof x; // Ok

// @Filename: foo2.ts
export = "sausages"; // Ok

// @Filename: foo3.ts
export = class Foo3 {}; // Error, not an expression

// @Filename: foo4.ts
export = true; // Ok

// @Filename: foo5.ts
export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript

// @Filename: foo6.ts
export = void; // Error, void operator requires an argument

// @Filename: foo7.ts
export = Date || String; // Ok

// @Filename: foo8.ts
export = null; // Ok

