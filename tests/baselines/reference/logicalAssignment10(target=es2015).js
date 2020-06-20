//// [logicalAssignment10.ts]
var count = 0;
var obj = {};
function incr() {
    return ++count;
}

obj[incr()] ??= incr();


//// [logicalAssignment10.js]
var _a;
var _b;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
(_a = obj[_b = incr()]) !== null && _a !== void 0 ? _a : (obj[_b] = incr());
