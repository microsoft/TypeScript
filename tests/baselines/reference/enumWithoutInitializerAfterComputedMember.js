//// [enumWithoutInitializerAfterComputedMember.ts]
enum E {
    a,
    b = Math.PI,
    c
}

//// [enumWithoutInitializerAfterComputedMember.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = Math.PI] = "b";
    E[E["c"] = undefined] = "c";
})(E || (E = {}));
