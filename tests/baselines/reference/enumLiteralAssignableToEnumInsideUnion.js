//// [enumLiteralAssignableToEnumInsideUnion.ts]
module X {
    export enum Foo {
        A, B
    }
}
module Y {
    export enum Foo {
        A, B
    }
}
const y: X.Foo | boolean = Y.Foo.A;


//// [enumLiteralAssignableToEnumInsideUnion.js]
var X;
(function (X) {
    (function (Foo) {
        Foo[Foo["A"] = 0] = "A";
        Foo[Foo["B"] = 1] = "B";
    })(X.Foo || (X.Foo = {}));
    var Foo = X.Foo;
})(X || (X = {}));
var Y;
(function (Y) {
    (function (Foo) {
        Foo[Foo["A"] = 0] = "A";
        Foo[Foo["B"] = 1] = "B";
    })(Y.Foo || (Y.Foo = {}));
    var Foo = Y.Foo;
})(Y || (Y = {}));
var y = Y.Foo.A;
