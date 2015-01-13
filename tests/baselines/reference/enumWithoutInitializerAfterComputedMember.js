//// [enumWithoutInitializerAfterComputedMember.ts]
enum E {
    a,
    b = a,
    c
}

//// [enumWithoutInitializerAfterComputedMember.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = E.a] = "b";
    E[E["c"] = undefined] = "c";
})(E || (E = {}));
