//// [tests/cases/compiler/instantiatedTypeAliasDisplay.ts] ////

//// [instantiatedTypeAliasDisplay.ts]
// Repros from #12066

interface X<A> {
    a: A;
}
interface Y<B> {
    b: B;
}
type Z<A, B> = X<A> | Y<B>;

declare function f1<A>(): Z<A, number>;
declare function f2<A, B, C, D, E>(a: A, b: B, c: C, d: D): Z<A, string[]>;

const x1 = f1<string>();  // Z<string, number>
const x2 = f2({}, {}, {}, {});  // Z<{}, string[]>

//// [instantiatedTypeAliasDisplay.js]
// Repros from #12066
var x1 = f1(); // Z<string, number>
var x2 = f2({}, {}, {}, {}); // Z<{}, string[]>


//// [instantiatedTypeAliasDisplay.d.ts]
interface X<A> {
    a: A;
}
interface Y<B> {
    b: B;
}
type Z<A, B> = X<A> | Y<B>;
declare function f1<A>(): Z<A, number>;
declare function f2<A, B, C, D, E>(a: A, b: B, c: C, d: D): Z<A, string[]>;
declare const x1: Z<string, number>;
declare const x2: Z<{}, string[]>;
