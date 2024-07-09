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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
// Fixes #16887
var Strs;
(function (Strs) {
    Strs["A"] = "a";
    Strs["B"] = "b";
})(Strs || (Strs = {}));
var x = (_a = {},
    _a[Strs.A] = 'xo',
    _a[Strs.B] = 'xe',
    _a);
var ux = (_b = {},
    _b[Strs.A] = 'xo',
    _b[Strs.B] = 'xe',
    _b);
var y = (_c = {},
    _c['a'] = 'yo',
    _c['b'] = 'ye',
    _c);
var a = 'a';
var b = 'b';
var z = (_d = {},
    _d[a] = 'zo',
    _d[b] = 'ze',
    _d);
var uz = (_e = {},
    _e[a] = 'zo',
    _e[b] = 'ze',
    _e);
var Nums;
(function (Nums) {
    Nums[Nums["A"] = 0] = "A";
    Nums[Nums["B"] = 1] = "B";
})(Nums || (Nums = {}));
var n = (_f = {},
    _f[Nums.A] = 1,
    _f[Nums.B] = 2,
    _f);
var un = (_g = {},
    _g[Nums.A] = 3,
    _g[Nums.B] = 4,
    _g);
var an = 0;
var bn = 1;
var m = (_h = {},
    _h[an] = 5,
    _h[bn] = 6,
    _h);
var um = (_j = {},
    _j[an] = 7,
    _j[bn] = 8,
    _j);
