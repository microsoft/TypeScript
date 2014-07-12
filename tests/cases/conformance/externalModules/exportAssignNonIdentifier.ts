// @Filename: foo1.ts
var x = 10;
export = typeof x; // Error

// @Filename: foo2.ts
export = "sausages"; // Error

// @Filename: foo3.ts
export = class Foo3 {}; // Error

// @Filename: foo4.ts
export = true; // Error

// @Filename: foo5.ts
export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript

// @Filename: foo6.ts
export = void; // Error

// @Filename: foo7.ts
export = Date || String; // Error

// @Filename: foo8.ts
export = null; // Error

