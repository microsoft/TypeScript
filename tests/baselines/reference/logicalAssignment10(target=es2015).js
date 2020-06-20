//// [logicalAssignment10.ts]
var count = 0;
var obj = {};
function incr() {
    return ++count;
}

obj[incr()] ??= incr();


//// [logicalAssignment10.js]
var _a;
var _b, _c;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
(_a = (_b = obj)[_c = incr()]) !== null && _a !== void 0 ? _a : (_b[_c] = incr());
