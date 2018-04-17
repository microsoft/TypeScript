//// [lateBoundDestructuringImplicitAnyError.ts]
let named = "foo";
let {[named]: prop} = {prop: "foo"};
void prop;

const numIndexed: {[idx: number]: string} = null as any;
const strIndexed: {[idx: string]: string} = null as any;

let numed = 6;

let {[named]: prop2} = numIndexed;
void prop2;
let {[numed]: prop3} = numIndexed;
void prop3;
let {[named]: prop4} = strIndexed;
void prop4;
let {[numed]: prop5} = strIndexed;
void prop5;


//// [lateBoundDestructuringImplicitAnyError.js]
var named = "foo";
var _a = named, prop = { prop: "foo" }[_a];
void prop;
var numIndexed = null;
var strIndexed = null;
var numed = 6;
var _b = named, prop2 = numIndexed[_b];
void prop2;
var _c = numed, prop3 = numIndexed[_c];
void prop3;
var _d = named, prop4 = strIndexed[_d];
void prop4;
var _e = numed, prop5 = strIndexed[_e];
void prop5;
