//// [tests/cases/compiler/objectLiteralPropertyImplicitlyAny.ts] ////

//// [objectLiteralPropertyImplicitlyAny.ts]
const foo = Symbol.for("foo");
const o = { [foo]: undefined };


//// [objectLiteralPropertyImplicitlyAny.js]
"use strict";
const foo = Symbol.for("foo");
const o = { [foo]: undefined };
