//@target: ES6
var array = [{x: [0], y: {p: ""}}]
for (var {x: [a], y: {p}} of array) {
    a;
    p;
}