//// [tests/cases/compiler/enumWithoutInitializerAfterComputedMember.ts] ////

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
    E[E["b"] = 0] = "b";
    E[E["c"] = 1] = "c";
})(E || (E = {}));
