//// [intersectionTypeNormalization.ts]
interface A { a: string }
interface B { b: string }
interface C { c: string }
interface D { d: string }

// Identical ways of writing the same type
type X1 = (A | B) & (C | D);
type X2 = A & (C | D) | B & (C | D)
type X3 = A & C | A & D | B & C | B & D;

var x: X1;
var x: X2;
var x: X3;

interface X { x: string }
interface Y { y: string }

// Identical ways of writing the same type
type Y1 = (A | X & Y) & (C | D);
type Y2 = A & (C | D) | X & Y & (C | D)
type Y3 = A & C | A & D | X & Y & C | X & Y & D;

var y: Y1;
var y: Y2;
var y: Y3;

interface M { m: string }
interface N { n: string }

// Identical ways of writing the same type
type Z1 = (A | X & (M | N)) & (C | D);
type Z2 = A & (C | D) | X & (M | N) & (C | D)
type Z3 = A & C | A & D | X & (M | N) & C | X & (M | N) & D;
type Z4 = A & C | A & D | X & M & C | X & N & C | X & M & D | X & N & D;

var z: Z1;
var z: Z2;
var z: Z3;
var z: Z4;

// Repro from #9919

type ToString = {
    toString(): string;
}

type BoxedValue = { kind: 'int',    num: number }
                | { kind: 'string', str: string }

type IntersectionFail = BoxedValue & ToString

type IntersectionInline = { kind: 'int',    num: number } & ToString
                        | { kind: 'string', str: string } & ToString

function getValueAsString(value: IntersectionFail): string {
    if (value.kind === 'int') {
        return '' + value.num;
    }
    return value.str;
}

// Repro from #12535

namespace enums {
    export const enum A {
        a1,
        a2,
        a3,
       // ... elements omitted for the sake of clarity
        a75,
        a76,
        a77,
    }
    export const enum B {
        b1,
        b2,
       // ... elements omitted for the sake of clarity
        b86,
        b87,
    }
    export const enum C {
        c1,
        c2,
       // ... elements omitted for the sake of clarity
        c210,
        c211,
    }
    export type Genre = A | B | C;
}

type Foo = {
    genreId: enums.Genre;
};

type Bar = {
    genreId: enums.Genre;
};

type FooBar = Foo & Bar;

function foo(so: any) {
    const val = so as FooBar;
    const isGenre = val.genreId;
    return isGenre;
}

//// [intersectionTypeNormalization.js]
var x;
var x;
var x;
var y;
var y;
var y;
var z;
var z;
var z;
var z;
function getValueAsString(value) {
    if (value.kind === 'int') {
        return '' + value.num;
    }
    return value.str;
}
function foo(so) {
    var val = so;
    var isGenre = val.genreId;
    return isGenre;
}
