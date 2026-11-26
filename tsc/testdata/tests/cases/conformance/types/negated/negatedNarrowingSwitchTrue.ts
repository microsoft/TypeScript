// @strict: true
// @noEmit: true

// `switch (true)` narrowing evaluates each case's condition against the reference. Each subsequent
// case sees the negation of the preceding conditions. This exercises the interaction between the
// fresh CFA negations introduced by instanceof/typeof and the switch-on-true clause narrowing.

class A {
    a = 1;
}
class B {
    b = 2;
}
class C {
    c = 3;
}

declare const x: A | B | C;
switch (true) {
    case x instanceof A:
        x; // A
        break;
    case x instanceof B:
        x; // B
        break;
    default:
        x; // C
}

// typeof-based switch(true).
declare const y: {};
switch (true) {
    case typeof y === "string":
        y; // string
        break;
    case typeof y === "number":
        y; // number
        break;
    default:
        y; // {} & not string & not number
}

// A guard-based switch(true).
interface Cat {
    meow(): void;
}
declare function isCat(v: unknown): v is Cat;
declare const z: {};
switch (true) {
    case isCat(z):
        z; // {} & Cat
        break;
    default:
        z; // {} & not Cat
}
