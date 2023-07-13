//// [tests/cases/compiler/strictFunctionTypesErrors.ts] ////

//// [strictFunctionTypesErrors.ts]
export {}


declare let f1: (x: Object) => Object;
declare let f2: (x: Object) => string;
declare let f3: (x: string) => Object;
declare let f4: (x: string) => string;

f1 = f2;  // Ok
f1 = f3;  // Error
f1 = f4;  // Error

f2 = f1;  // Error
f2 = f3;  // Error
f2 = f4;  // Error

f3 = f1;  // Ok
f3 = f2;  // Ok
f3 = f4;  // Ok

f4 = f1;  // Error
f4 = f2;  // Ok
f4 = f3;  // Error

type Func<T, U> = (x: T) => U;

declare let g1: Func<Object, Object>;
declare let g2: Func<Object, string>;
declare let g3: Func<string, Object>;
declare let g4: Func<string, string>;

g1 = g2;  // Ok
g1 = g3;  // Error
g1 = g4;  // Error

g2 = g1;  // Error
g2 = g3;  // Error
g2 = g4;  // Error

g3 = g1;  // Ok
g3 = g2;  // Ok
g3 = g4;  // Ok

g4 = g1;  // Error
g4 = g2;  // Ok
g4 = g3;  // Error

declare let h1: Func<Func<Object, void>, Object>;
declare let h2: Func<Func<Object, void>, string>;
declare let h3: Func<Func<string, void>, Object>;
declare let h4: Func<Func<string, void>, string>;

h1 = h2;  // Ok
h1 = h3;  // Ok
h1 = h4;  // Ok

h2 = h1;  // Error
h2 = h3;  // Error
h2 = h4;  // Ok

h3 = h1;  // Error
h3 = h2;  // Error
h3 = h4;  // Ok

h4 = h1;  // Error
h4 = h2;  // Error
h4 = h3;  // Error

declare let i1: Func<Object, Func<Object, void>>;
declare let i2: Func<Object, Func<string, void>>;
declare let i3: Func<string, Func<Object, void>>;
declare let i4: Func<string, Func<string, void>>;

i1 = i2;  // Error
i1 = i3;  // Error
i1 = i4;  // Error

i2 = i1;  // Ok
i2 = i3;  // Error
i2 = i4;  // Error

i3 = i1;  // Ok
i3 = i2;  // Error
i3 = i4;  // Error

i4 = i1;  // Ok
i4 = i2;  // Ok
i4 = i3;  // Ok

interface Animal { animal: void }
interface Dog extends Animal { dog: void }
interface Cat extends Animal { cat: void }

interface Comparer1<T> {
    compare(a: T, b: T): number;
}

declare let animalComparer1: Comparer1<Animal>;
declare let dogComparer1: Comparer1<Dog>;

animalComparer1 = dogComparer1;  // Ok
dogComparer1 = animalComparer1;  // Ok

interface Comparer2<T> {
    compare: (a: T, b: T) => number;
}

declare let animalComparer2: Comparer2<Animal>;
declare let dogComparer2: Comparer2<Dog>;

animalComparer2 = dogComparer2;  // Error
dogComparer2 = animalComparer2;  // Ok

// Crate<T> is invariant in --strictFunctionTypes mode

interface Crate<T> {
    item: T;
    onSetItem: (item: T) => void;
}

declare let animalCrate: Crate<Animal>;
declare let dogCrate: Crate<Dog>;

// Errors below should elaborate the reason for invariance

animalCrate = dogCrate;  // Error
dogCrate = animalCrate;  // Error

// Verify that callback parameters are strictly checked

declare let fc1: (f: (x: Animal) => Animal) => void;
declare let fc2: (f: (x: Dog) => Dog) => void;
fc1 = fc2;  // Error
fc2 = fc1;  // Error

// Verify that callback parameters aren't loosely checked when types
// originate in method declarations

namespace n1 {
    class Foo {
        static f1(x: Animal): Animal { throw "wat"; }
        static f2(x: Dog): Animal { throw "wat"; };
    }
    declare let f1: (cb: typeof Foo.f1) => void;
    declare let f2: (cb: typeof Foo.f2) => void;
    f1 = f2;
    f2 = f1;  // Error
}

namespace n2 {
    type BivariantHack<Input, Output> = { foo(x: Input): Output }["foo"];
    declare let f1: (cb: BivariantHack<Animal, Animal>) => void;
    declare let f2: (cb: BivariantHack<Dog, Animal>) => void;
    f1 = f2;
    f2 = f1;  // Error
}

//// [strictFunctionTypesErrors.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
f1 = f2; // Ok
f1 = f3; // Error
f1 = f4; // Error
f2 = f1; // Error
f2 = f3; // Error
f2 = f4; // Error
f3 = f1; // Ok
f3 = f2; // Ok
f3 = f4; // Ok
f4 = f1; // Error
f4 = f2; // Ok
f4 = f3; // Error
g1 = g2; // Ok
g1 = g3; // Error
g1 = g4; // Error
g2 = g1; // Error
g2 = g3; // Error
g2 = g4; // Error
g3 = g1; // Ok
g3 = g2; // Ok
g3 = g4; // Ok
g4 = g1; // Error
g4 = g2; // Ok
g4 = g3; // Error
h1 = h2; // Ok
h1 = h3; // Ok
h1 = h4; // Ok
h2 = h1; // Error
h2 = h3; // Error
h2 = h4; // Ok
h3 = h1; // Error
h3 = h2; // Error
h3 = h4; // Ok
h4 = h1; // Error
h4 = h2; // Error
h4 = h3; // Error
i1 = i2; // Error
i1 = i3; // Error
i1 = i4; // Error
i2 = i1; // Ok
i2 = i3; // Error
i2 = i4; // Error
i3 = i1; // Ok
i3 = i2; // Error
i3 = i4; // Error
i4 = i1; // Ok
i4 = i2; // Ok
i4 = i3; // Ok
animalComparer1 = dogComparer1; // Ok
dogComparer1 = animalComparer1; // Ok
animalComparer2 = dogComparer2; // Error
dogComparer2 = animalComparer2; // Ok
// Errors below should elaborate the reason for invariance
animalCrate = dogCrate; // Error
dogCrate = animalCrate; // Error
fc1 = fc2; // Error
fc2 = fc1; // Error
// Verify that callback parameters aren't loosely checked when types
// originate in method declarations
var n1;
(function (n1) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        Foo.f1 = function (x) { throw "wat"; };
        Foo.f2 = function (x) { throw "wat"; };
        ;
        return Foo;
    }());
    f1 = f2;
    f2 = f1; // Error
})(n1 || (n1 = {}));
var n2;
(function (n2) {
    f1 = f2;
    f2 = f1; // Error
})(n2 || (n2 = {}));
