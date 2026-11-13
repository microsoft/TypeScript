// @strict: true
// @noEmit: true

type U1 = NoInfer<{ kind: "a"; a: number } | { kind: "b"; b: number }> | { kind: "c" };

function f1(u: U1) {
    if (u.kind === "a") {
        u.a;
    }
}

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
