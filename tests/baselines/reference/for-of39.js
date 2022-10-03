//// [for-of39.ts]
var map = new Map([["", true], ["", 0]]);
for (var [k, v] of map) {
    k;
    v;
}

//// [for-of39.js]
var map = new Map([["", true], ["", 0]]);
for (var [k, v] of map) {
    k;
    v;
}
