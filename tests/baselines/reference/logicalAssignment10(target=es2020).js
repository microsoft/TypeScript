//// [logicalAssignment10.ts]
var count = 0;
var obj = {};
function incr() {
    return ++count;
}

obj[incr()] ??= incr();


//// [logicalAssignment10.js]
var _a;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
obj[_a = incr()] ?? (obj[_a] = incr());
