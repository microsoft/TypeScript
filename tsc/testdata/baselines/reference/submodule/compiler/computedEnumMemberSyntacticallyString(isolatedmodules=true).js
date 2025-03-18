//// [tests/cases/compiler/computedEnumMemberSyntacticallyString.ts] ////

//// [computedEnumMemberSyntacticallyString.ts]
const BAR = 2..toFixed(0);

enum Foo {
    A = `${BAR}`,
    B = "2" + BAR,
    C = (`${BAR}`),

    F = BAR,
    G = 2 + BAR,

    H = A,
    I = H + BAR,
    J = H
}


//// [computedEnumMemberSyntacticallyString.js]
const BAR = 2..toFixed(0);
var Foo;
(function (Foo) {
    Foo["A"] = `${BAR}`;
    if (typeof Foo.A !== "string") Foo[Foo.A] = "A";
    Foo["B"] = "2" + BAR;
    if (typeof Foo.B !== "string") Foo[Foo.B] = "B";
    Foo["C"] = (`${BAR}`);
    if (typeof Foo.C !== "string") Foo[Foo.C] = "C";
    Foo["F"] = BAR;
    if (typeof Foo.F !== "string") Foo[Foo.F] = "F";
    Foo["G"] = 2 + BAR;
    if (typeof Foo.G !== "string") Foo[Foo.G] = "G";
    Foo["H"] = Foo.A;
    if (typeof Foo.H !== "string") Foo[Foo.H] = "H";
    Foo["I"] = Foo.H + BAR;
    if (typeof Foo.I !== "string") Foo[Foo.I] = "I";
    Foo["J"] = Foo.H;
    if (typeof Foo.J !== "string") Foo[Foo.J] = "J";
})(Foo || (Foo = {}));
