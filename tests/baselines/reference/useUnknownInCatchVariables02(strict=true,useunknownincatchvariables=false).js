//// [useUnknownInCatchVariables02.ts]
try {}
catch ({ name }) { name; }

try {}
catch ({ name }) {}

try {}
catch ({ a: { b } }) { b; }

try {}
catch ({ a: { b } }) {}

try {}
catch ([a, { b }]) { a; }

try {}
catch ([a, { b }]) {}


//// [useUnknownInCatchVariables02.js]
"use strict";
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
