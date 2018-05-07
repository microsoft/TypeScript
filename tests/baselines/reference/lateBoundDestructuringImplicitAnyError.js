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
var _a = named, prop = { prop: "foo" }[_a];
void prop;
var numIndexed = null;
var strIndexed = null;
var numed = 6;
var symed = Symbol();
var symed2 = Symbol();
var _b = named, prop2 = numIndexed[_b];
void prop2;
var _c = numed, prop3 = numIndexed[_c];
void prop3;
var _d = named, prop4 = strIndexed[_d];
void prop4;
var _e = numed, prop5 = strIndexed[_e];
void prop5;
var _f = symed, prop6 = numIndexed[_f];
void prop6;
var _g = symed, prop7 = strIndexed[_g];
void prop7;
var _h = symed2, prop8 = numIndexed[_h];
void prop8;
var _j = symed2, prop9 = strIndexed[_j];
void prop9;
