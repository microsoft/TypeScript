//// [enumNegativeLiteral1.ts]
enum E {
    a = -5, b, c
}


//// [enumNegativeLiteral1.js]
var E;
(function (E) {
    E[E["a"] = -5] = "a";
    E[E["b"] = -4] = "b";
    E[E["c"] = -3] = "c";
})(E || (E = {}));
