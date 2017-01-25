class K { p = 12; m() { } }
interface I { p: number, m(): void }
let k = new K()
let sk = { ...k };
let ssk = { ...k, ...k };
sk.p;
sk.m(); // error
ssk.p;
ssk.m(); // error
let i: I = { p: 12, m() { } };
let si = { ...i };
let ssi = { ...i, ...i };
si.p;
si.m(); // ok
ssi.p;
ssi.m(); // ok
let o = { p: 12, m() { } };
let so = { ...o };
let sso = { ...o, ...o };
so.p;
so.m(); // ok
sso.p;
sso.m(); // ok
