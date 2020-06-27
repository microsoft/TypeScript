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
var count = 0;
var obj = {};
function incr() {
    return ++count;
}
const oobj = {
    obj
};
obj[incr()] ??= incr();
oobj["obj"][incr()] ??= incr();
