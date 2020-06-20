//// [logicalAssignment10.ts]
var count = 0;
var obj = {};
function incr() {
    return ++count;
}

obj[incr()] ??= incr();


//// [logicalAssignment10.js]
var _a, _b;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
(_a = obj)[_b = incr()] ?? (_a[_b] = incr());
