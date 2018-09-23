//// [symbolType19.ts]
enum E { }
var x: symbol | E;

x;
if (typeof x === "number") {
    x;
}
else {
    x;
}

//// [symbolType19.js]
var E = E || (E = {});
(function (E) {
})(E);
var x;
x;
if (typeof x === "number") {
    x;
}
else {
    x;
}
