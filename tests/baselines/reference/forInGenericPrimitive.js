//// [forInGenericPrimitive.ts]
function f<
A,
B extends { a: number } | string,
C extends string | void,
D extends number | { s: string } | null | string,
E extends { x: number },
>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
) {
    for (const _ in a) { }
    for (const _ in b) { }
    for (const _ in c) { }
    for (const _ in d) { }
    for (const _ in e) { }
}

//// [forInGenericPrimitive.js]
"use strict";
function f(a, b, c, d, e) {
    for (var _ in a) { }
    for (var _ in b) { }
    for (var _ in c) { }
    for (var _ in d) { }
    for (var _ in e) { }
}
