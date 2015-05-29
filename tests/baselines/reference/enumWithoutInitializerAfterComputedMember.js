//// [enumWithoutInitializerAfterComputedMember.ts]
const z = 6;

enum E {
    a,
    b = a,
    c,
    d = f,
    f,
    g = bad,
    h = E.b,
    i = E["b"],
    j = z,
    k = 3,
    l,
    m = (Math.random() > 0.5 ? 1 : 2),
}

//// [enumWithoutInitializerAfterComputedMember.js]
var z = 6;
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E["b"] = E.a;
    E[E["c"] = 1] = "c";
    E["d"] = E.f;
    E[E["f"] = 2] = "f";
    E[E["g"] = bad] = "g";
    E["h"] = E.b;
    E["i"] = E["b"];
    E[E["j"] = z] = "j";
    E[E["k"] = 3] = "k";
    E[E["l"] = 4] = "l";
    E[E["m"] = (Math.random() > 0.5 ? 1 : 2)] = "m";
})(E || (E = {}));
