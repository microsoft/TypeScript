//// [tests/cases/conformance/es2021/logicalAssignment/logicalAssignment10.ts] ////

//// [logicalAssignment10.ts]
var count = 0;
var obj = {};
function incr() {
    return ++count;
}

const oobj = {
    obj
}

obj[incr()] ??= incr();
oobj["obj"][incr()] ??= incr();


//// [logicalAssignment10.js]
"use strict";
var _a, _b, _c, _d, _e;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
const oobj = {
    obj
};
(_b = obj[_a = incr()]) !== null && _b !== void 0 ? _b : (obj[_a] = incr());
(_e = (_c = oobj["obj"])[_d = incr()]) !== null && _e !== void 0 ? _e : (_c[_d] = incr());
