//// [tests/cases/compiler/ambientConstLiterals.ts] ////

//// [ambientConstLiterals.ts]
function f<T>(x: T): T {
    return x;
}

enum E { A, B, C, "non identifier" }

const c1 = "abc";
const c2 = 123;
const c3: "abc" = c1;
const c4: 123 = c2;
const c5: 123 = f(123);
const c6: -123 = f(-123);
const c7 = true;
const c8: E.A = E.A;
const c8b: (typeof E)["non identifier"] = E["non identifier"];
const c9 = { x: "abc" };
const c10: number[] = [123];
const c11: string = "abc" + "def";
const c12: number = 123 + 456;
const c13: "abc" | "def" = Math.random() > 0.5 ? "abc" : "def";
const c14: 123 | 456 = Math.random() > 0.5 ? 123 : 456;

/// [Declarations] ////



//// [ambientConstLiterals.d.ts]
declare function f<T>(x: T): T;
declare enum E {
    A = 0,
    B = 1,
    C = 2,
    "non identifier" = 3
}
declare const c1 = "abc";
declare const c2 = 123;
declare const c3: "abc";
declare const c4: 123;
declare const c5: 123;
declare const c6: -123;
declare const c7 = true;
declare const c8: E.A;
declare const c8b = E["non identifier"];
declare const c9: {
    x: string;
};
declare const c10: number[];
declare const c11: string;
declare const c12: number;
declare const c13: "abc" | "def";
declare const c14: 123 | 456;
//# sourceMappingURL=ambientConstLiterals.d.ts.map