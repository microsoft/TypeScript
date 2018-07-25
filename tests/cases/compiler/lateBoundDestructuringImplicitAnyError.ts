// @lib: es6
// @noImplicitAny: true
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