//// [tests/cases/compiler/destructureCatchClause.ts] ////

//// [destructureCatchClause.ts]
// These are okay with useUnknownInCatchVariables=false, but not okay with useUnknownInCatchVariables=true.
try {} catch ({ x }) { x }
try {} catch ([ x ]) { x }

try {} catch ({ a: { x } }) { x }
try {} catch ({ a: [ x ] }) { x }

try {} catch ([{ x }]) { x }
try {} catch ([[ x ]]) { x }

try {} catch ({ a: { b: { c: { x }} }}) { x }


try {} catch ({ x }: any) { x }
try {} catch ([ x ]: any) { x }

try {} catch ({ a: { x } }: any) { x }
try {} catch ({ a: [ x ] }: any) { x }

try {} catch ([{ x }]: any) { x }
try {} catch ([[ x ]]: any) { x }

try {} catch ({ a: { b: { c: { x }} }}: any) { x }


try {} catch ({ x }: unknown) { x }
try {} catch ([ x ]: unknown) { x }

try {} catch ({ a: { x } }: unknown) { x }
try {} catch ({ a: [ x ] }: unknown) { x }

try {} catch ([{ x }]: unknown) { x }
try {} catch ([[ x ]]: unknown) { x }

try {} catch ({ a: { b: { c: { x }} }}: unknown) { x }


//// [destructureCatchClause.js]
// These are okay with useUnknownInCatchVariables=false, but not okay with useUnknownInCatchVariables=true.
try { }
catch (_a) {
    var x = _a.x;
    x;
}
try { }
catch (_b) {
    var x = _b[0];
    x;
}
try { }
catch (_c) {
    var x = _c.a.x;
    x;
}
try { }
catch (_d) {
    var x = _d.a[0];
    x;
}
try { }
catch (_e) {
    var x = _e[0].x;
    x;
}
try { }
catch (_f) {
    var x = _f[0][0];
    x;
}
try { }
catch (_g) {
    var x = _g.a.b.c.x;
    x;
}
try { }
catch (_h) {
    var x = _h.x;
    x;
}
try { }
catch (_j) {
    var x = _j[0];
    x;
}
try { }
catch (_k) {
    var x = _k.a.x;
    x;
}
try { }
catch (_l) {
    var x = _l.a[0];
    x;
}
try { }
catch (_m) {
    var x = _m[0].x;
    x;
}
try { }
catch (_o) {
    var x = _o[0][0];
    x;
}
try { }
catch (_p) {
    var x = _p.a.b.c.x;
    x;
}
try { }
catch (_q) {
    var x = _q.x;
    x;
}
try { }
catch (_r) {
    var x = _r[0];
    x;
}
try { }
catch (_s) {
    var x = _s.a.x;
    x;
}
try { }
catch (_t) {
    var x = _t.a[0];
    x;
}
try { }
catch (_u) {
    var x = _u[0].x;
    x;
}
try { }
catch (_v) {
    var x = _v[0][0];
    x;
}
try { }
catch (_w) {
    var x = _w.a.b.c.x;
    x;
}
