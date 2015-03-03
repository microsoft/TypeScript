//// [for-of41.ts]
var array = [{x: [0], y: {p: ""}}]
for (var {x: [a], y: {p}} of array) {
    a;
    p;
}

//// [for-of41.js]
var array = [{ x: [0], y: { p: "" } }];
for (var { x: [a], y: { p } } of array) {
    a;
    p;
}
