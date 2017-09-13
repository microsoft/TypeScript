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
