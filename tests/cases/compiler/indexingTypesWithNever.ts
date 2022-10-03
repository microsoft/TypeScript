// @strict: true

type TestObj = {
  a: string;
  b: number;
};

// Should be never but without an error
type Result1 = TestObj[never];

type EmptyObj = {};

// Should be never but without an error
type Result2 = EmptyObj[keyof EmptyObj];

declare function genericFn1<T>(obj: T): T[never];

// Should be never
const result3 = genericFn1({ c: "ctest", d: "dtest" });

declare function genericFn2<T extends { [ind: string]: string }>(
  obj: T
): T[never];

// Should be never
const result4 = genericFn2({ e: "etest", f: "ftest" });

declare function genericFn3<
  T extends { [K in keyof T]: T[K] },
  U extends keyof T,
  V extends keyof T
>(obj: T, u: U, v: V): T[U & V];

// Should be never
const result5 = genericFn3({ g: "gtest", h: "htest" }, "g", "h"); // 'g' & 'h' will reduce to never


declare const obj: {a: string, b: number}
declare const key: never

const result6 = obj[key]

// Expanded examples from https://github.com/Microsoft/TypeScript/issues/21988
type RequiredPropNames<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P
}[keyof T];

type OptionalPropNames<T> = {
  [P in keyof T]-?: undefined extends T[P] ? P : never
}[keyof T];

type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };
type OptionalProps<T> = { [P in OptionalPropNames<T>]?: T[P] };

type Match<Exp, Act> = [Exp] extends [Act]
  ? ([Act] extends [Exp] ? "Match" : "Did not match 2")
  : "Did not match 1";

type ExpectType<Exp, Act> = Match<Exp, Act> extends "Match"
  ? ({} extends Exp ? Match<Required<Exp>, Required<Act>> : "Match")
  : "Did not match";

type P3 = { a: string; b: number; c?: boolean };
type P2 = { a: string; c?: boolean };
type P1 = { c?: boolean };
type P0 = {};

type P3Names = RequiredPropNames<P3>; // expect 'a' | 'b'
type P2Names = RequiredPropNames<P2>; // expect 'a'
type P1Names = RequiredPropNames<P1>; // expect never
type P0Names = RequiredPropNames<P0>; // expect never

declare const p3NameTest: ExpectType<"a" | "b", P3Names>;
declare const p2NameTest: ExpectType<"a", P2Names>;
declare const p1NameTest: ExpectType<never, P1Names>;
declare const p0NameTest: ExpectType<never, P0Names>;

type P3Props = RequiredProps<P3>; // expect { a: string; b: number }
type P2Props = RequiredProps<P2>; // expect { a: string; }
type P1Props = RequiredProps<P1>; // expect {}
type P0Props = RequiredProps<P0>; // expect {}

declare const p3Test: ExpectType<{ a: string; b: number }, P3Props>;
declare const p2Test: ExpectType<{ a: string }, P2Props>;
declare const p1Test: ExpectType<{}, P1Props>;
declare const p0Test: ExpectType<{}, P0Props>;

type O3 = { a?: string; b?: number; c: boolean };
type O2 = { a?: string; c: boolean };
type O1 = { c: boolean };
type O0 = {};

type O3Names = OptionalPropNames<O3>; // expect 'a' | 'b'
type O2Names = OptionalPropNames<O2>; // expect 'a'
type O1Names = OptionalPropNames<O1>; // expect never
type O0Names = OptionalPropNames<O0>; // expect never

declare const o3NameTest: ExpectType<"a" | "b", O3Names>;
declare const o2NameTest: ExpectType<"a", O2Names>;
declare const o1NameTest: ExpectType<never, O1Names>;
declare const o0NameTest: ExpectType<never, O0Names>;

type O3Props = OptionalProps<O3>; // expect { a?: string | undefined; b?: number | undefined }
type O2Props = OptionalProps<O2>; // expect { a?: string | undefined; }
type O1Props = OptionalProps<O1>; // expect {}
type O0Props = OptionalProps<O0>; // expect {}

declare const o3Test: ExpectType<{ a?: string; b?: number }, O3Props>;
declare const o2Test: ExpectType<{ a?: string }, O2Props>;
declare const o1Test: ExpectType<{}, O1Props>;
declare const o0Test: ExpectType<{}, O0Props>;

// Repro from #23005

type Example<T extends Record<'a', string>> = T['a'];

type Res1 = Example<{ a: "x" } | { a: "y" }>;  // "x" | "y"
type Res2 = Example<{ a: "x" }>;  // "x"
type Res3 = Example<never>;  // never 
