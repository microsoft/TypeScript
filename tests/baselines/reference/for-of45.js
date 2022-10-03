//// [for-of45.ts]
var k: string, v: boolean;
var map = new Map([["", true]]);
for ([k = "", v = false] of map) {
    k;
    v;
}

//// [for-of45.js]
var k, v;
var map = new Map([["", true]]);
for ([k = "", v = false] of map) {
    k;
    v;
}
