//// [tests/cases/conformance/types/intersection/intersectionReduction.ts] ////

//// [intersectionReduction.ts]
declare const sym1: unique symbol;
declare const sym2: unique symbol;

type T1 = string & 'a';  // 'a'
type T2 = 'a' & string & 'b';  // never
type T3 = number & 10;  // 10
type T4 = 10 & number & 20;  // never
type T5 = symbol & typeof sym1;  // typeof sym1
type T6 = typeof sym1 & symbol & typeof sym2;  // never
type T7 = string & 'a' & number & 10 & symbol & typeof sym1;  // never

type T10 = string & ('a' | 'b');  // 'a' | 'b'
type T11 = (string | number) & ('a' | 10);  // 'a' | 10

type N1 = 'a' & 'b';
type N2 = { a: string } & null;
type N3 = { a: string } & undefined;
type N4 = string & number;
type N5 = number & object;
type N6 = symbol & string;
type N7 = void & string;

type X = { x: string };

type X1 = X | 'a' & 'b';
type X2 = X | { a: string } & null;
type X3 = X | { a: string } & undefined;
type X4 = X | string & number;
type X5 = X | number & object;
type X6 = X | symbol & string;
type X7 = X | void & string;

type A = { kind: 'a', foo: string };
type B = { kind: 'b', foo: number };
type C = { kind: 'c', foo: number };

declare let ab: A & B;
ab.kind;  // Error

declare let x: A | (B & C);  // A
let a: A = x;

type AB = A & B;  // never
type BC = B & C;  // never

type U1 = Partial<A & B>;  // never
type U2 = Readonly<A & B>;  // never
type U3 = (A & B)['kind'];  // never
type U4 = A & B | B & C;  // never
type U5 = A | B & C;  // A

type K1 = keyof (A & B);  // string | number | symbol
type K2 = keyof A | keyof B;  // 'kind' | 'foo'

type Merge1<T, U> = { [P in keyof (T & U)]: P extends keyof T ? T[P] : U[P & keyof U] }
type Merge2<T, U> = { [P in keyof T | keyof U]: P extends keyof T ? T[P] : U[P & keyof U] }

type M1 = { a: 1, b: 2 } & { a: 2, c: 3 };  // never
type M2 = Merge1<{ a: 1, b: 2 }, { a: 2, c: 3 }>;  // {}
type M3 = Merge2<{ a: 1, b: 2 }, { a: 2, c: 3 }>;  // { a: 1, b: 2, c: 3 }

type D = { kind: 'd', foo: unknown };
type E = { kind: 'e', foo: unknown };

declare function f10<T>(x: { foo: T }): T;

declare let a1: A | D;
declare let a2: A | D & E;

let r1 = f10(a1);  // unknown
let r2 = f10(a2);  // string

// Repro from #31663

const x1 = { a: 'foo', b: 42 };
const x2 = { a: 'foo', b: true };

declare let k: 'a' | 'b';

x1[k] = 'bar' as any;  // Error
x2[k] = 'bar' as any;  // Error

const enum Tag1 {}
const enum Tag2 {}

declare let s1: string & Tag1;
declare let s2: string & Tag2;

declare let t1: string & Tag1 | undefined;
declare let t2: string & Tag2 | undefined;

s1 = s2;
s2 = s1;

t1 = t2;
t2 = t1;

// Repro from #36736

const f1 = (t: "a" | ("b" & "c")): "a" => t;

type Container<Type extends string> = {
    type: Type;
}

const f2 = (t: Container<"a"> | (Container<"b"> & Container<"c">)): Container<"a"> => t;
const f3 = (t: Container<"a"> | (Container<"b"> & { dataB: boolean } & Container<"a">)): Container<"a"> => t;
const f4 = (t: number | (Container<"b"> & { dataB: boolean } & Container<"a">)): number => t;

// Repro from #38549

interface A2 {
    kind: "A";
    a: number;
}

interface B2 {
    kind: "B";
    b: number;
}

declare const shouldBeB: (A2 | B2) & B2;
const b: B2 = shouldBeB; // works

function inGeneric<T extends A2 | B2>(alsoShouldBeB: T & B2) {
    const b: B2 = alsoShouldBeB;
}

// Repro from #38542

interface ABI {
    kind: 'a' | 'b';
}

declare class CA { kind: 'a'; a: string; x: number };
declare class CB { kind: 'b'; b: string; y: number };

function bar<T extends CA | CB>(x: T & CA) {
    let ab: ABI = x;
}


//// [intersectionReduction.js]
ab.kind; // Error
var a = x;
var r1 = f10(a1); // unknown
var r2 = f10(a2); // string
// Repro from #31663
var x1 = { a: 'foo', b: 42 };
var x2 = { a: 'foo', b: true };
x1[k] = 'bar'; // Error
x2[k] = 'bar'; // Error
s1 = s2;
s2 = s1;
t1 = t2;
t2 = t1;
// Repro from #36736
var f1 = function (t) { return t; };
var f2 = function (t) { return t; };
var f3 = function (t) { return t; };
var f4 = function (t) { return t; };
var b = shouldBeB; // works
function inGeneric(alsoShouldBeB) {
    var b = alsoShouldBeB;
}
;
;
function bar(x) {
    var ab = x;
}
