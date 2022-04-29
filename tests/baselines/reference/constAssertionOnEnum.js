//// [tests/cases/conformance/expressions/typeAssertions/constAssertionOnEnum.ts] ////

//// [enum.ts]
export enum Foo {
    A,
    B,
}

//// [test.ts]
import {Foo} from './enum';

enum Bar {
    A,
    B,
}
let foo = Foo.A as const;
let bar = Bar.A as const;

//// [ns.ts]
namespace ns {
    export enum Foo { X }
    ns.Foo.X as const;
}

//// [more.ts]
export enum Foo { X }
(Foo).X as const;


//// [enum.js]
export var Foo;
(function (Foo) {
    Foo[Foo["A"] = 0] = "A";
    Foo[Foo["B"] = 1] = "B";
})(Foo || (Foo = {}));
//// [test.js]
import { Foo } from './enum';
var Bar;
(function (Bar) {
    Bar[Bar["A"] = 0] = "A";
    Bar[Bar["B"] = 1] = "B";
})(Bar || (Bar = {}));
let foo = Foo.A;
let bar = Bar.A;
//// [ns.js]
"use strict";
var ns;
(function (ns) {
    let Foo;
    (function (Foo) {
        Foo[Foo["X"] = 0] = "X";
    })(Foo = ns.Foo || (ns.Foo = {}));
    ns.Foo.X;
})(ns || (ns = {}));
//// [more.js]
export var Foo;
(function (Foo) {
    Foo[Foo["X"] = 0] = "X";
})(Foo || (Foo = {}));
(Foo).X;
