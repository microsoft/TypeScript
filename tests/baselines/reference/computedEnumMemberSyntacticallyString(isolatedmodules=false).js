//// [tests/cases/compiler/computedEnumMemberSyntacticallyString.ts] ////

//// [computedEnumMemberSyntacticallyString.ts]
const BAR = 2..toFixed(0);

enum Foo {
    A = `${BAR}`,
    B = "2" + BAR,
    C = (`${BAR}`),
    D = (`${BAR}}`) as string,
    E = `${BAR}`!,
}


//// [computedEnumMemberSyntacticallyString.js]
const BAR = 2..toFixed(0);
var Foo;
(function (Foo) {
    Foo["A"] = `${BAR}`;
    Foo["B"] = "2" + BAR;
    Foo["C"] = (`${BAR}`);
    Foo["D"] = (`${BAR}}`);
    Foo["E"] = `${BAR}`;
})(Foo || (Foo = {}));
