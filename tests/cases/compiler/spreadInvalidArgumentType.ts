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
