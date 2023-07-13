//// [tests/cases/compiler/enumLiteralAssignableToEnumInsideUnion.ts] ////

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
module Z {
    export enum Foo {
        A = 1 << 1,
        B = 1 << 2,
    }
}
module Ka {
    export enum Foo {
        A = 1 << 10,
        B = 1 << 11,
    }
}
const e0: X.Foo | boolean = Y.Foo.A; // ok
const e1: X.Foo | boolean = Z.Foo.A; // not legal, Z is computed
const e2: X.Foo.A | X.Foo.B | boolean = Z.Foo.A; // still not legal
const e3: X.Foo.B | boolean = Z.Foo.A; // not legal
const e4: X.Foo.A | boolean = Z.Foo.A; // not legal either because Z.Foo is computed and Z.Foo.A is not necessarily assignable to X.Foo.A
const e5: Ka.Foo | boolean = Z.Foo.A; // ok


//// [enumLiteralAssignableToEnumInsideUnion.js]
var X;
(function (X) {
    var Foo;
    (function (Foo) {
        Foo[Foo["A"] = 0] = "A";
        Foo[Foo["B"] = 1] = "B";
    })(Foo = X.Foo || (X.Foo = {}));
})(X || (X = {}));
var Y;
(function (Y) {
    var Foo;
    (function (Foo) {
        Foo[Foo["A"] = 0] = "A";
        Foo[Foo["B"] = 1] = "B";
    })(Foo = Y.Foo || (Y.Foo = {}));
})(Y || (Y = {}));
var Z;
(function (Z) {
    var Foo;
    (function (Foo) {
        Foo[Foo["A"] = 2] = "A";
        Foo[Foo["B"] = 4] = "B";
    })(Foo = Z.Foo || (Z.Foo = {}));
})(Z || (Z = {}));
var Ka;
(function (Ka) {
    var Foo;
    (function (Foo) {
        Foo[Foo["A"] = 1024] = "A";
        Foo[Foo["B"] = 2048] = "B";
    })(Foo = Ka.Foo || (Ka.Foo = {}));
})(Ka || (Ka = {}));
var e0 = Y.Foo.A; // ok
var e1 = Z.Foo.A; // not legal, Z is computed
var e2 = Z.Foo.A; // still not legal
var e3 = Z.Foo.A; // not legal
var e4 = Z.Foo.A; // not legal either because Z.Foo is computed and Z.Foo.A is not necessarily assignable to X.Foo.A
var e5 = Z.Foo.A; // ok
