//// [spreadInvalidArgumentType.ts]
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

    var o1 = { ...p1 };   // Error, generic type paramterre
    var o2 = { ...p2 };   // OK
    var o3 = { ...t };   // Error, generic type paramter

    var o4 = { ...i };   // Error, index access
    var o5 = { ...k };   // Error, index

    var o6 = { ...mapped_generic }; // Error, generic mapped object type
    var o7 = { ...mapped };  // OK, non-generic mapped type

    var o8 = { ...union_generic };  // Error, union with generic type parameter

    var o10 = { ...intersection_generic };  // Error, intersection with generic type parameter

    var o14 = { ...u };  // OK
    var o15 = { ...n };  // OK

    var o16 = { ...a };  // OK
}


//// [spreadInvalidArgumentType.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
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
    var o1 = __assign({}, p1); // Error, generic type paramterre
    var o2 = __assign({}, p2); // OK
    var o3 = __assign({}, t); // Error, generic type paramter
    var o4 = __assign({}, i); // Error, index access
    var o5 = __assign({}, k); // Error, index
    var o6 = __assign({}, mapped_generic); // Error, generic mapped object type
    var o7 = __assign({}, mapped); // OK, non-generic mapped type
    var o8 = __assign({}, union_generic); // Error, union with generic type parameter
    var o10 = __assign({}, intersection_generic); // Error, intersection with generic type parameter
    var o14 = __assign({}, u); // OK
    var o15 = __assign({}, n); // OK
    var o16 = __assign({}, a); // OK
}
