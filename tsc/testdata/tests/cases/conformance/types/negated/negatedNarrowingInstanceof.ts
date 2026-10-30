// @strict: true
// @noEmit: true

// `instanceof` narrowing is nominal (prototype-based), so it deliberately does NOT introduce a
// structural `not C` in the false branch. Class types frequently lack nominal tags and are structural
// subtypes of one another, so a structural negation would unsoundly reduce nominally-distinct
// constituents to `never`. This file guards that instanceof narrows by filtering only.

class Animal {
    move(): void {}
}
class Dog extends Animal {
    bark(): void {}
}

// A broad base is narrowed on the true branch but left intact (no `not Dog`) on the false branch.
declare const a: object;
if (a instanceof Dog) {
    a; // Dog
} else {
    a; // object
}

declare const b: {};
if (b instanceof Dog) {
    b; // Dog
} else {
    b; // {}
}

// A supertype base keeps the whole supertype (no `not Dog`).
declare const c: Animal;
if (c instanceof Dog) {
    c; // Dog
} else {
    c; // Animal
}

// A bare type parameter: true branch intersects, false branch is unchanged.
function generic<T>(x: T) {
    if (x instanceof Dog) {
        x; // T & Dog
    } else {
        x; // T
    }
}

// Structurally-related but nominally-distinct classes must both survive: `Derived2` structurally
// extends `Derived1`, but a `Derived2` instance is not `instanceof Derived1`, so the else branch
// must keep `Derived2` (it must NOT collapse to `never`).
class Base {
    basey = "";
}
class Derived1 extends Base {
    d = "";
}
class Derived2 extends Base {
    d = "";
    other = "";
}
declare const e: Derived1 | Derived2;
if (e instanceof Derived1) {
    e; // Derived1
} else {
    e; // Derived2
}

// A disjoint object constituent is dropped on the true branch and kept on the false branch.
declare const d: Dog | { kind: "other" };
if (d instanceof Dog) {
    d; // Dog
} else {
    d; // { kind: "other"; }
}
