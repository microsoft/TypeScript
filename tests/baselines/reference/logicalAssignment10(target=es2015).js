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
var _a, _b;
var _c, _d, _e;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
const oobj = {
    obj
};
(_a = obj[_c = incr()]) !== null && _a !== void 0 ? _a : (obj[_c] = incr());
(_b = (_d = oobj["obj"])[_e = incr()]) !== null && _b !== void 0 ? _b : (_d[_e] = incr());
