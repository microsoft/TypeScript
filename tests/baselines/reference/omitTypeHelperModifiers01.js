//// [omitTypeHelperModifiers01.ts]
type A = {
    a: number;
    b?: string;
    readonly c: boolean;
    d: unknown;
};

type B = Omit<A, 'a'>;

function f(x: B) {
    const b = x.b;
    x.b = "hello";
    x.b = undefined;

    const c = x.c;
    x.c = true;

    const d = x.d;
    x.d = d;
}


//// [omitTypeHelperModifiers01.js]
"use strict";
function f(x) {
    var b = x.b;
    x.b = "hello";
    x.b = undefined;
    var c = x.c;
    x.c = true;
    var d = x.d;
    x.d = d;
}
