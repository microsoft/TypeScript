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
var _a, _b, _c;
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
const oobj = {
    obj
};
obj[_a = incr()] ?? (obj[_a] = incr());
(_b = oobj["obj"])[_c = incr()] ?? (_b[_c] = incr());
