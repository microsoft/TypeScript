// @target: esnext, es2020, es2015

var count = 0;
var obj = {};
function incr() {
    return ++count;
}

obj[incr()] ??= incr();
