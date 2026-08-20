//// [tests/cases/compiler/indexedAccessImplicitlyAny.ts] ////

//// [indexedAccessImplicitlyAny.ts]
interface I { foof: number };
declare const i: I;
i.foo;
i["foo"];

//// [indexedAccessImplicitlyAny.js]
"use strict";
;
i.foo;
i["foo"];
