//// [mappedTypeNumericEnum.ts]
// with numbers
enum Nums {
    A,
    B
}
enum Nums2 {
    Aleph,
    Bet,
    Gimel
}
type NumBool = { [K in Nums]: boolean }
let nb: NumBool = { '0': true, '1': false }
let wronb: NumBool = { '0': true, '2': false }
let wronb2: NumBool = { '0': true }
nb[Nums.A] = false;
nb[Nums2.Bet] = true;
nb[Nums2.Gimel] = false; // only disallowed with --strict

// with strings
enum Strs {
    A = 'a',
    B = 'b'
}
type StrAny = { [K in Strs]: any }
let sa: StrAny = { a: 1, b: 2 }
sa[Strs.A] = 'a'
sa['nope'] = 'not allowed'

// union of numbers
type Ns = 0 | 1;
type NumNum = { [K in Ns]: number }
let nn: NumNum = { [Nums.A]: 3, [Nums.B]: 4 }
let omnomnom: NumNum = { '0': 12, [Nums.B]: 13, [Nums2.Gimel]: 14 }
nn[0] = 5
nn['1'] = 6

// single number
type N = 0;
type OneNumNum = { [K in N]: number }
let onn: OneNumNum = { [Nums.A]: 7 }
let wronng: OneNumNum = { [Nums.A]: 7, [Nums.B]: 11 }
onn[0] = 8
onn['0'] = 9
onn[1] = 10 // only disallowed with --strict

// just number
type NumberNum = { [K in number]: number }
let numn: NumberNum = { }
numn[0] = 31
numn['1'] = 32
numn['oops'] = 33

// computed enum gets a string indexer
enum Comp {
    A,
    B = 1 << 3
}

type CompNum = { [K in Comp]: number }
let cn: CompNum = { [Comp.A]: 15 }
let cnn: CompNum = { [Comp.A]: 16, '101': 17 }
cn[1001] = 18
cn['maybe?'] = 19

// manual string/number union mixes
type Mix = 0 | 1 | 'a' | 'i' | 'u';
type MixNum = { [K in Mix]: number }
let mn: MixNum = { [0]: 20, '1': 21, a: 22, i: 23, u: 24 }
let mnn: MixNum = { [0]: 29, [1]: 30 }

// conflicts result in the property being thrown out
type MixConflict = 0 | 1 | 1 | 1 | 1 | 1 | 2 | '0' | '1';
type MixConflictNum = { [K in MixConflict]: number }
let mcn: MixConflictNum = { [2]: 25 }
let mcnn: MixConflictNum = { [0]: 26, [1]: 27, [2]: 28 }


//// [mappedTypeNumericEnum.js]
"use strict";
// with numbers
var Nums;
(function (Nums) {
    Nums[Nums["A"] = 0] = "A";
    Nums[Nums["B"] = 1] = "B";
})(Nums || (Nums = {}));
var Nums2;
(function (Nums2) {
    Nums2[Nums2["Aleph"] = 0] = "Aleph";
    Nums2[Nums2["Bet"] = 1] = "Bet";
    Nums2[Nums2["Gimel"] = 2] = "Gimel";
})(Nums2 || (Nums2 = {}));
var nb = { '0': true, '1': false };
var wronb = { '0': true, '2': false };
var wronb2 = { '0': true };
nb[Nums.A] = false;
nb[Nums2.Bet] = true;
nb[Nums2.Gimel] = false; // only disallowed with --strict
// with strings
var Strs;
(function (Strs) {
    Strs["A"] = "a";
    Strs["B"] = "b";
})(Strs || (Strs = {}));
var sa = { a: 1, b: 2 };
sa[Strs.A] = 'a';
sa['nope'] = 'not allowed';
var nn = (_a = {}, _a[Nums.A] = 3, _a[Nums.B] = 4, _a);
var omnomnom = (_b = { '0': 12 }, _b[Nums.B] = 13, _b[Nums2.Gimel] = 14, _b);
nn[0] = 5;
nn['1'] = 6;
var onn = (_c = {}, _c[Nums.A] = 7, _c);
var wronng = (_d = {}, _d[Nums.A] = 7, _d[Nums.B] = 11, _d);
onn[0] = 8;
onn['0'] = 9;
onn[1] = 10; // only disallowed with --strict
var numn = {};
numn[0] = 31;
numn['1'] = 32;
numn['oops'] = 33;
// computed enum gets a string indexer
var Comp;
(function (Comp) {
    Comp[Comp["A"] = 0] = "A";
    Comp[Comp["B"] = 8] = "B";
})(Comp || (Comp = {}));
var cn = (_e = {}, _e[Comp.A] = 15, _e);
var cnn = (_f = {}, _f[Comp.A] = 16, _f['101'] = 17, _f);
cn[1001] = 18;
cn['maybe?'] = 19;
var mn = (_g = {}, _g[0] = 20, _g['1'] = 21, _g.a = 22, _g.i = 23, _g.u = 24, _g);
var mnn = (_h = {}, _h[0] = 29, _h[1] = 30, _h);
var mcn = (_j = {}, _j[2] = 25, _j);
var mcnn = (_k = {}, _k[0] = 26, _k[1] = 27, _k[2] = 28, _k);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
