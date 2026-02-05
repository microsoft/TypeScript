//// [tests/cases/compiler/arrayConcatMap.ts] ////

//// [arrayConcatMap.ts]
var x = [].concat([{ a: 1 }], [{ a: 2 }])
          .map(b => b.a);

//// [arrayConcatMap.js]
"use strict";
var x = [].concat([{ a: 1 }], [{ a: 2 }])
    .map(b => b.a);
