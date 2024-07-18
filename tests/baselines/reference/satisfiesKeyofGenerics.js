//// [tests/cases/conformance/types/keyof/satisfiesKeyofGenerics.ts] ////

//// [satisfiesKeyofGenerics.ts]
export function f<
    T,
    U extends string,
    V extends "onefield",
    W extends "afield" | "bfield",
>(
    p1: T,
    p2: T & string,
    p3: T & "f",
    p4: T | string,
    p5: T | "g",
    p6: Extract<T, "h">,

    p7: U,
    p8: U & string,
    p9: U & "f",
    p10: U | string,
    p11: U | "g",
    p12: Extract<U, "h">,

    p13: V,
    p14: V & string,
    p15: V & "onefield",
    p16: V | string,
    p17: V | "onefield",
    p18: Extract<V, "onefield">,

    p19: W,
    p20: W & string,
    p21: W & "afield", // reduction rules for generics extending unions will simplify this to just "afield" where possible, so should be the only one that works without error
    p22: W | string,
    p23: W | "afield",
    p24: Extract<W, "afield">,
) {
    return [
        class Foo {
            [p1 satisfies keyof]() {
                return 1 as const;
            }
            [p2 satisfies keyof]() {
                return 2 as const;
            }
            [p3 satisfies keyof]() {
                return 3 as const;
            }
            [p4 satisfies keyof]() {
                return 4 as const;
            }
            [p5 satisfies keyof]() {
                return 5 as const;
            }
            [p6 satisfies keyof]() {
                return 6 as const;
            }
            [p7 satisfies keyof]() {
                return 7 as const;
            }
            [p8 satisfies keyof]() {
                return 8 as const;
            }
            [p9 satisfies keyof]() {
                return 9 as const;
            }
            [p10 satisfies keyof]() {
                return 10 as const;
            }
            [p11 satisfies keyof]() {
                return 11 as const;
            }
            [p12 satisfies keyof]() {
                return 12 as const;
            }
            [p13 satisfies keyof]() {
                return 13 as const;
            }
            [p14 satisfies keyof]() {
                return 14 as const;
            }
            [p15 satisfies keyof]() {
                return 15 as const;
            }
            [p16 satisfies keyof]() {
                return 16 as const;
            }
            [p17 satisfies keyof]() {
                return 17 as const;
            }
            [p18 satisfies keyof]() {
                return 18 as const;
            }
            [p19 satisfies keyof]() {
                return 19 as const;
            }
            [p20 satisfies keyof]() {
                return 20 as const;
            }
            [p21 satisfies keyof]() {
                return 21 as const;
            }
            [p22 satisfies keyof]() {
                return 22 as const;
            }
            [p23 satisfies keyof]() {
                return 23 as const;
            }
            [p24 satisfies keyof]() {
                return 24 as const;
            }
        }
    ] as const;
}

//// [satisfiesKeyofGenerics.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, // reduction rules for generics extending unions will simplify this to just "afield" where possible, so should be the only one that works without error
p22, p23, p24) {
    return [
        /** @class */ (function () {
            function Foo() {
            }
            Foo.prototype[p1] = function () {
                return 1;
            };
            Foo.prototype[p2] = function () {
                return 2;
            };
            Foo.prototype[p3] = function () {
                return 3;
            };
            Foo.prototype[p4] = function () {
                return 4;
            };
            Foo.prototype[p5] = function () {
                return 5;
            };
            Foo.prototype[p6] = function () {
                return 6;
            };
            Foo.prototype[p7] = function () {
                return 7;
            };
            Foo.prototype[p8] = function () {
                return 8;
            };
            Foo.prototype[p9] = function () {
                return 9;
            };
            Foo.prototype[p10] = function () {
                return 10;
            };
            Foo.prototype[p11] = function () {
                return 11;
            };
            Foo.prototype[p12] = function () {
                return 12;
            };
            Foo.prototype[p13] = function () {
                return 13;
            };
            Foo.prototype[p14] = function () {
                return 14;
            };
            Foo.prototype[p15] = function () {
                return 15;
            };
            Foo.prototype[p16] = function () {
                return 16;
            };
            Foo.prototype[p17] = function () {
                return 17;
            };
            Foo.prototype[p18] = function () {
                return 18;
            };
            Foo.prototype[p19] = function () {
                return 19;
            };
            Foo.prototype[p20] = function () {
                return 20;
            };
            Foo.prototype[p21] = function () {
                return 21;
            };
            Foo.prototype[p22] = function () {
                return 22;
            };
            Foo.prototype[p23] = function () {
                return 23;
            };
            Foo.prototype[p24] = function () {
                return 24;
            };
            return Foo;
        }())
    ];
}


//// [satisfiesKeyofGenerics.d.ts]
export declare function f<T, U extends string, V extends "onefield", W extends "afield" | "bfield">(p1: T, p2: T & string, p3: T & "f", p4: T | string, p5: T | "g", p6: Extract<T, "h">, p7: U, p8: U & string, p9: U & "f", p10: U | string, p11: U | "g", p12: Extract<U, "h">, p13: V, p14: V & string, p15: V & "onefield", p16: V | string, p17: V | "onefield", p18: Extract<V, "onefield">, p19: W, p20: W & string, p21: W & "afield", // reduction rules for generics extending unions will simplify this to just "afield" where possible, so should be the only one that works without error
p22: W | string, p23: W | "afield", p24: Extract<W, "afield">): readonly [{
    new (): {
        [p1](): 1;
        [p2](): 2;
        [p3](): 3;
        [p4](): 4;
        [p5](): 5;
        [p6](): 6;
        [p7](): 7;
        [p8](): 8;
        [p9](): 9;
        [p10](): 10;
        [p11](): 11;
        [p12](): 12;
        [p13](): 13;
        [p14](): 14;
        [p15](): 15;
        [p16](): 16;
        [p17](): 17;
        [p18](): 18;
        [p19](): 19;
        [p20](): 20;
        afield(): 21;
        [p22](): 22;
        [p23](): 23;
        [p24](): 24;
    };
}];
