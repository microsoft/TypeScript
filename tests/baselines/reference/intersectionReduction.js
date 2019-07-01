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


//// [intersectionReduction.js]
// Repro from #31663
var x1 = { a: 'foo', b: 42 };
var x2 = { a: 'foo', b: true };
x1[k] = 'bar'; // Error
x2[k] = 'bar'; // Error
s1 = s2;
s2 = s1;
t1 = t2;
t2 = t1;
