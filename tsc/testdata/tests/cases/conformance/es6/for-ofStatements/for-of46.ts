//@target: ES6
var k: string, v: boolean;
var map = new Map([["", true]]);
for ([k = false, v = ""] of map) {
    k;
    v;
}