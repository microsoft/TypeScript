// @declaration: true
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