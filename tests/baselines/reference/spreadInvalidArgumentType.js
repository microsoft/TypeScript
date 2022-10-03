//// [spreadInvalidArgumentType.ts]
enum E { v1, v2 };

function f<T extends { b: string }>(p1: T, p2: T[]) {
    var t: T;

    var i: T["b"];
    var k: keyof T;

    var mapped_generic: {[P in keyof T]: T[P]};
    var mapped: {[P in "b"]: T[P]};

    var union_generic: T | { a: number };
    var union_primitive: { a: number } | number;

    var intersection_generic: T & { a: number };
    var intersection_primitive: { a: number } | string;

    var num: number;
    var str: number;
    var literal_string: "string";
    var literal_number: 42;

    var u: undefined;
    var n: null;
    var a: any;


    var e: E;

    var o1 = { ...p1 };  // OK, generic type paramterre
    var o2 = { ...p2 };  // OK
    var o3 = { ...t };   // OK, generic type paramter
    var o4 = { ...i };   // Error, index access
    var o5 = { ...k };   // Error, index
    var o6 = { ...mapped_generic }; // OK, generic mapped object type
    var o7 = { ...mapped };  // OK, non-generic mapped type

    var o8 = { ...union_generic };  // OK, union with generic type parameter
    var o9 = { ...union_primitive };  // Error, union with generic type parameter

    var o10 = { ...intersection_generic };  // OK, intersection with generic type parameter
    var o11 = { ...intersection_primitive };  // Error, intersection with generic type parameter

    var o12 = { ...num };  // Error
    var o13 = { ...str };  // Error

    var o14 = { ...u };  // error, undefined-only not allowed
    var o15 = { ...n };  // error, null-only not allowed

    var o16 = { ...a };  // OK

    var o17 = { ...literal_string };  // Error
    var o18 = { ...literal_number };  // Error

    var o19 = { ...e };  // Error, enum
}


//// [spreadInvalidArgumentType.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var E;
(function (E) {
    E[E["v1"] = 0] = "v1";
    E[E["v2"] = 1] = "v2";
})(E || (E = {}));
;
function f(p1, p2) {
    var t;
    var i;
    var k;
    var mapped_generic;
    var mapped;
    var union_generic;
    var union_primitive;
    var intersection_generic;
    var intersection_primitive;
    var num;
    var str;
    var literal_string;
    var literal_number;
    var u;
    var n;
    var a;
    var e;
    var o1 = __assign({}, p1); // OK, generic type paramterre
    var o2 = __assign({}, p2); // OK
    var o3 = __assign({}, t); // OK, generic type paramter
    var o4 = __assign({}, i); // Error, index access
    var o5 = __assign({}, k); // Error, index
    var o6 = __assign({}, mapped_generic); // OK, generic mapped object type
    var o7 = __assign({}, mapped); // OK, non-generic mapped type
    var o8 = __assign({}, union_generic); // OK, union with generic type parameter
    var o9 = __assign({}, union_primitive); // Error, union with generic type parameter
    var o10 = __assign({}, intersection_generic); // OK, intersection with generic type parameter
    var o11 = __assign({}, intersection_primitive); // Error, intersection with generic type parameter
    var o12 = __assign({}, num); // Error
    var o13 = __assign({}, str); // Error
    var o14 = __assign({}, u); // error, undefined-only not allowed
    var o15 = __assign({}, n); // error, null-only not allowed
    var o16 = __assign({}, a); // OK
    var o17 = __assign({}, literal_string); // Error
    var o18 = __assign({}, literal_number); // Error
    var o19 = __assign({}, e); // Error, enum
}
