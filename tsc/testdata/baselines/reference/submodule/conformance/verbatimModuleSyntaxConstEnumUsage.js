//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxConstEnumUsage.ts] ////

//// [foo.ts]
export enum Foo {
    a = 1,
    b,
    c,
}

//// [bar.ts]
import {Foo} from './foo.js';

export enum Bar {
    a = Foo.a,
    c = Foo.c,
    e = 5,
}

//// [foo.js]
export { Foo };
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 1] = "a";
    Foo[Foo["b"] = 2] = "b";
    Foo[Foo["c"] = 3] = "c";
})(Foo || (Foo = {}));
//// [bar.js]
import { Foo } from './foo.js';
export { Bar };
var Bar;
(function (Bar) {
    Bar["a"] = Foo.a;
    if (typeof Bar.a !== "string") Bar[Bar.a] = "a";
    Bar["c"] = Foo.c;
    if (typeof Bar.c !== "string") Bar[Bar.c] = "c";
    Bar[Bar["e"] = 5] = "e";
})(Bar || (Bar = {}));
