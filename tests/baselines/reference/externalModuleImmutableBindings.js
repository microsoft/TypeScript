//// [tests/cases/compiler/externalModuleImmutableBindings.ts] ////

//// [f1.ts]
export var x = 1;

//// [f2.ts]
// all mutations below are illegal and should be fixed
import * as stuff from './f1';

var n = 'baz';

stuff.x = 0;
stuff['x'] = 1;
stuff.blah = 2;
stuff[n] = 3;

stuff.x++;
stuff['x']++;
stuff['blah']++;
stuff[n]++;

(stuff.x) = 0;
(stuff['x']) = 1;
(stuff.blah) = 2;
(stuff[n]) = 3;

(stuff.x)++;
(stuff['x'])++;
(stuff['blah'])++;
(stuff[n])++;

for (stuff.x in []) {}
for (stuff.x of []) {}
for (stuff['x'] in []) {}
for (stuff['x'] of []) {}
for (stuff.blah in []) {}
for (stuff.blah of []) {}
for (stuff[n] in []) {}
for (stuff[n] of []) {}

for ((stuff.x) in []) {}
for ((stuff.x) of []) {}
for ((stuff['x']) in []) {}
for ((stuff['x']) of []) {}
for ((stuff.blah) in []) {}
for ((stuff.blah) of []) {}
for ((stuff[n]) in []) {}
for ((stuff[n]) of []) {}




//// [f1.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 1;
//// [f2.js]
"use strict";
exports.__esModule = true;
// all mutations below are illegal and should be fixed
var stuff = require("./f1");
var n = 'baz';
stuff.x = 0;
stuff['x'] = 1;
stuff.blah = 2;
stuff[n] = 3;
stuff.x++;
stuff['x']++;
stuff['blah']++;
stuff[n]++;
(stuff.x) = 0;
(stuff['x']) = 1;
(stuff.blah) = 2;
(stuff[n]) = 3;
(stuff.x)++;
(stuff['x'])++;
(stuff['blah'])++;
(stuff[n])++;
for (stuff.x in []) { }
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    stuff.x = _a[_i];
}
for (stuff['x'] in []) { }
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    stuff['x'] = _c[_b];
}
for (stuff.blah in []) { }
for (var _d = 0, _e = []; _d < _e.length; _d++) {
    stuff.blah = _e[_d];
}
for (stuff[n] in []) { }
for (var _f = 0, _g = []; _f < _g.length; _f++) {
    stuff[n] = _g[_f];
}
for ((stuff.x) in []) { }
for (var _h = 0, _j = []; _h < _j.length; _h++) {
    (stuff.x) = _j[_h];
}
for ((stuff['x']) in []) { }
for (var _k = 0, _l = []; _k < _l.length; _k++) {
    (stuff['x']) = _l[_k];
}
for ((stuff.blah) in []) { }
for (var _m = 0, _o = []; _m < _o.length; _m++) {
    (stuff.blah) = _o[_m];
}
for ((stuff[n]) in []) { }
for (var _p = 0, _q = []; _p < _q.length; _p++) {
    (stuff[n]) = _q[_p];
}
