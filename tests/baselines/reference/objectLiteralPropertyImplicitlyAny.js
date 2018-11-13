//// [objectLiteralPropertyImplicitlyAny.ts]
const foo = Symbol.for("foo");
const o = { [foo]: undefined };


//// [objectLiteralPropertyImplicitlyAny.js]
const foo = Symbol.for("foo");
const o = { [foo]: undefined };
