//// [tests/cases/compiler/computedEnumMemberSyntacticallyString.ts] ////

//// [computedEnumMemberSyntacticallyString.ts]
const BAR = 2..toFixed(0);

enum Foo {
    A = `${BAR}`,
    B = "2" + BAR,
}


//// [computedEnumMemberSyntacticallyString.js]
const BAR = 2..toFixed(0);
var Foo;
(function (Foo) {
    Foo["A"] = `${BAR}`;
    Foo["B"] = "2" + BAR;
})(Foo || (Foo = {}));
