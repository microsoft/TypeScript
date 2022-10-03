// @target: esnext
// @useDefineForClassFields: false

class K {
    p = 12;
    m() { }
    get g() { return 0; }
}
interface I {
    p: number;
    m(): void;
    readonly g: number;
}

let k = new K()
let sk = { ...k };
let ssk = { ...k, ...k };
sk.p;
sk.m(); // error
sk.g; // error
ssk.p;
ssk.m(); // error
ssk.g; // error

let i: I = { p: 12, m() { }, get g() { return 0; } };
let si = { ...i };
let ssi = { ...i, ...i };
si.p;
si.m(); // ok
si.g; // ok
ssi.p;
ssi.m(); // ok
ssi.g; // ok

let o = { p: 12, m() { }, get g() { return 0; } };
let so = { ...o };
let sso = { ...o, ...o };
so.p;
so.m(); // ok
so.g; // ok
sso.p;
sso.m(); // ok
sso.g; // ok
