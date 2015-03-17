//@target: ES6
var map = new Map([["", true]]);
for (var [k = "", v = false] of map) {
    k;
    v;
}