//// [useUnknownInCatchVariables03.ts]
try {}
catch ({ name }: unknown) { name; }

try {}
catch ({ name }: unknown) {}

try {}
catch ({ a: { b } }: unknown) { b; }

try {}
catch ({ a: { b } }: unknown) {}

try {}
catch ([a, { b }]: unknown) { a; }

try {}
catch ([a, { b }]: unknown) {}


//// [useUnknownInCatchVariables03.js]
try { }
catch (_a) {
    var name = _a.name;
    name;
}
try { }
catch (_b) {
    var name = _b.name;
}
try { }
catch (_c) {
    var b = _c.a.b;
    b;
}
try { }
catch (_d) {
    var b = _d.a.b;
}
try { }
catch (_e) {
    var a = _e[0], b = _e[1].b;
    a;
}
try { }
catch (_f) {
    var a = _f[0], b = _f[1].b;
}
