//// [tests/cases/compiler/restInvalidArgumentType.ts] ////

//// [restInvalidArgumentType.ts]
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
    var intersection_primitive: { a: number } & string;
    var num: number;
    var str: string;
    var literal_string: "string";
    var literal_number: 42;
    var e: E;

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
    var {...r9} = union_primitive;  // Error, union with generic type parameter

    var {...r10} = intersection_generic;  // Error, intersection with generic type parameter
    var {...r11} = intersection_primitive;  // Error, intersection with generic type parameter

    var {...r12} = num;  // Error
    var {...r13} = str;  // Error

    var {...r14} = u;  // error, undefined-only not allowed
    var {...r15} = n;  // error, null-only not allowed

    var {...r16} = a;  // OK

    var {...r17} = literal_string;  // Error
    var {...r18} = literal_number;  // Error

    var {...r19} = e;  // Error, enum
}


//// [restInvalidArgumentType.js]
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
    var e;
    var u;
    var n;
    var a;
    var { ...r1 } = p1;
    var { ...r2 } = p2;
    var { ...r3 } = t;
    var { ...r4 } = i;
    var { ...r5 } = k;
    var { ...r6 } = mapped_generic;
    var { ...r7 } = mapped;
    var { ...r8 } = union_generic;
    var { ...r9 } = union_primitive;
    var { ...r10 } = intersection_generic;
    var { ...r11 } = intersection_primitive;
    var { ...r12 } = num;
    var { ...r13 } = str;
    var { ...r14 } = u;
    var { ...r15 } = n;
    var { ...r16 } = a;
    var { ...r17 } = literal_string;
    var { ...r18 } = literal_number;
    var { ...r19 } = e;
}
