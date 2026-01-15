// @target: esnext, es2021, es2020, es2015

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
