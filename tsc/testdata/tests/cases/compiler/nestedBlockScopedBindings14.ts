// @target: es2015
var x;
for (; false;) {
    let x;
    () => x;
}

var y;
for (; false;) {
    let y;
    y = 1;
}