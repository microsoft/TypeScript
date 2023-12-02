//// [tests/cases/compiler/objectLiteralEnumPropertyNames.ts] ////

//// [objectLiteralEnumPropertyNames.ts]
// Fixes #16887
enum Strs {
    A = 'a',
    B = 'b'
}
type TestStrs = { [key in Strs]: string }
const x: TestStrs = {
    [Strs.A]: 'xo',
    [Strs.B]: 'xe'
}
const ux = {
    [Strs.A]: 'xo',
    [Strs.B]: 'xe'
}
const y: TestStrs = {
    ['a']: 'yo',
    ['b']: 'ye'
}
const a = 'a';
const b = 'b';
const z: TestStrs = {
    [a]: 'zo',
    [b]: 'ze'
}
const uz = {
    [a]: 'zo',
    [b]: 'ze'
}

enum Nums {
    A,
    B
}
type TestNums = { 0: number, 1: number }
const n: TestNums = {
    [Nums.A]: 1,
    [Nums.B]: 2
}
const un = {
    [Nums.A]: 3,
    [Nums.B]: 4
}
const an = 0;
const bn = 1;
const m: TestNums = {
    [an]: 5,
    [bn]: 6
}
const um = {
    [an]: 7,
    [bn]: 8
}


/// [Declarations] ////



//// [objectLiteralEnumPropertyNames.d.ts]
declare enum Strs {
    A = "a",
    B = "b"
}
type TestStrs = {
    [key in Strs]: string;
};
declare const x: TestStrs;
declare const ux: {
    [Strs.A]: string;
    [Strs.B]: string;
};
declare const y: TestStrs;
declare const a = "a";
declare const b = "b";
declare const z: TestStrs;
declare const uz: {
    [a]: string;
    [b]: string;
};
declare enum Nums {
    A = 0,
    B = 1
}
type TestNums = {
    0: number;
    1: number;
};
declare const n: TestNums;
declare const un: {
    [Nums.A]: number;
    [Nums.B]: number;
};
declare const an = 0;
declare const bn = 1;
declare const m: TestNums;
declare const um: {
    [an]: number;
    [bn]: number;
};
