// @strict: true
// @noEmit: true

// A non-generic top-level type alias can hold a NoInfer type whose constraint is a union. A reference to it is
// narrowed through that constraint.

type U1 = NoInfer<{ kind: "a"; a: number } | { kind: "b"; b: number }> | { kind: "c" };

function f1(u: U1) {
    if (u.kind === "a") {
        u.a;
    }
}

// The same after an instantiation of Box<string> has computed whether U2 could contain type variables.

type U2 = NoInfer<{ kind: "a"; a: number } | { kind: "b"; b: number }> | { kind: "c" };

interface Box<T> {
    u: U2;
    t: T;
}

declare const box: Box<string>;
box.u;

function f2(u: U2) {
    if (u.kind === "a") {
        u.a;
    }
}
