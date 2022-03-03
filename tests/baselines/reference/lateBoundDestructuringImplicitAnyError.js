//// [lateBoundDestructuringImplicitAnyError.ts]
let named = "foo";
let {[named]: prop} = {prop: "foo"};
void prop;

const numIndexed: {[idx: number]: string} = null as any;
const strIndexed: {[idx: string]: string} = null as any;

let numed = 6;

const symed = Symbol();
let symed2 = Symbol();

let {[named]: prop2} = numIndexed;
void prop2;
let {[numed]: prop3} = numIndexed;
void prop3;
let {[named]: prop4} = strIndexed;
void prop4;
let {[numed]: prop5} = strIndexed;
void prop5;
let {[symed]: prop6} = numIndexed;
void prop6;
let {[symed]: prop7} = strIndexed;
void prop7;
let {[symed2]: prop8} = numIndexed;
void prop8;
let {[symed2]: prop9} = strIndexed;
void prop9;

//// [lateBoundDestructuringImplicitAnyError.js]
var named = "foo";
var _a = { prop: "foo" }, _b = named, prop = _a[_b];
void prop;
var numIndexed = null;
var strIndexed = null;
var numed = 6;
var symed = Symbol();
var symed2 = Symbol();
var _c = numIndexed, _d = named, prop2 = _c[_d];
void prop2;
var _e = numIndexed, _f = numed, prop3 = _e[_f];
void prop3;
var _g = strIndexed, _h = named, prop4 = _g[_h];
void prop4;
var _j = strIndexed, _k = numed, prop5 = _j[_k];
void prop5;
var _l = numIndexed, _m = symed, prop6 = _l[_m];
void prop6;
var _o = strIndexed, _p = symed, prop7 = _o[_p];
void prop7;
var _q = numIndexed, _r = symed2, prop8 = _q[_r];
void prop8;
var _s = strIndexed, _t = symed2, prop9 = _s[_t];
void prop9;
