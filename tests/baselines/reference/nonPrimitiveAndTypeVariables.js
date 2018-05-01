//// [nonPrimitiveAndTypeVariables.ts]
// Repros from #23800

type A<T, V> = { [P in keyof T]: T[P] extends V ? 1 : 0; };
type B<T, V> = { [P in keyof T]: T[P] extends V | object ? 1 : 0; };

type a = A<{ a: 0 | 1 }, 0>; // { a: 0; }
type b = B<{ a: 0 | 1 }, 0>; // { a: 0; }

function foo<T, U>(x: T) {
    let a: object = x;  // Error
    let b: U | object = x;  // Error
}


//// [nonPrimitiveAndTypeVariables.js]
"use strict";
// Repros from #23800
function foo(x) {
    var a = x; // Error
    var b = x; // Error
}
