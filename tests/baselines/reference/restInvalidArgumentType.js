//// [restInvalidArgumentType.ts]
function f<T extends { b: string }>(p1: T, p2: T[]) {
    var t: T;

    var i: T["b"];
    var k: keyof T;

    var mapped_generic: {[P in keyof T]: T[P]};
    var mapped: {[P in "b"]: T[P]};

    var union_generic: T | { a: number };
    var intersection_generic: T & { a: number };

    var u: undefined;
    var n: null;

    var a: any;

    var {...r1} = p1;   // Error, generic type paramterre
    var {...r2} = p2;   // OK
    var {...r3} = t;   // Error, generic type paramter

    var {...r4} = i;   // Error, index access
    var {...r5} = k;   // Error, index

    var {...r6} = mapped_generic; // Error, generic mapped object type
    var {...r7} = mapped;  // OK, non-generic mapped type

    var {...r8} = union_generic;  // Error, union with generic type parameter

    var {...r10} = intersection_generic;  // Error, intersection with generic type parameter

    var {...r14} = u;  // OK
    var {...r15} = n;  // OK

    var {...r16} = a;  // OK
}


//// [restInvalidArgumentType.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
function f(p1, p2) {
    var t;
    var i;
    var k;
    var mapped_generic;
    var mapped;
    var union_generic;
    var intersection_generic;
    var u;
    var n;
    var a;
    var r1 = __rest(p1, []); // Error, generic type paramterre
    var r2 = __rest(p2, []); // OK
    var r3 = __rest(t, []); // Error, generic type paramter
    var r4 = __rest(i, []); // Error, index access
    var r5 = __rest(k, []); // Error, index
    var r6 = __rest(mapped_generic, []); // Error, generic mapped object type
    var r7 = __rest(mapped, []); // OK, non-generic mapped type
    var r8 = __rest(union_generic, []); // Error, union with generic type parameter
    var r10 = __rest(intersection_generic, []); // Error, intersection with generic type parameter
    var r14 = __rest(u, []); // OK
    var r15 = __rest(n, []); // OK
    var r16 = __rest(a, []); // OK
}
