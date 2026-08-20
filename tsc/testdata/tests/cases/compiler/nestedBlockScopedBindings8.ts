// @target: es2015
var x;
for (let x; false; ) {
    () => x;
}

var y;
for (let y; false; ) {
    y = 1;
}