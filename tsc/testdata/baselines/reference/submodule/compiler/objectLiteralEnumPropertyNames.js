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


//// [objectLiteralEnumPropertyNames.js]
// Fixes #16887
var Strs;
(function (Strs) {
    Strs["A"] = "a";
    Strs["B"] = "b";
})(Strs || (Strs = {}));
const x = {
    [Strs.A]: 'xo',
    [Strs.B]: 'xe'
};
const ux = {
    [Strs.A]: 'xo',
    [Strs.B]: 'xe'
};
const y = {
    ['a']: 'yo',
    ['b']: 'ye'
};
const a = 'a';
const b = 'b';
const z = {
    [a]: 'zo',
    [b]: 'ze'
};
const uz = {
    [a]: 'zo',
    [b]: 'ze'
};
var Nums;
(function (Nums) {
    Nums[Nums["A"] = 0] = "A";
    Nums[Nums["B"] = 1] = "B";
})(Nums || (Nums = {}));
const n = {
    [Nums.A]: 1,
    [Nums.B]: 2
};
const un = {
    [Nums.A]: 3,
    [Nums.B]: 4
};
const an = 0;
const bn = 1;
const m = {
    [an]: 5,
    [bn]: 6
};
const um = {
    [an]: 7,
    [bn]: 8
};
