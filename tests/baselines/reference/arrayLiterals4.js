//// [arrayLiterals4.ts]
"use strict"
var [public, static] = [1, 23, ];
var protected = [1, 2, 3];
var [a, b, c] = [...protected];
var [[public, package]] = [[1, [2, 3]]];
var [...implements] = [[]];


//// [arrayLiterals4.js]
"use strict";
var _a = [1, 23,], public = _a[0], static = _a[1];
var protected = [1, 2, 3];
var _b = protected, a = _b[0], b = _b[1], c = _b[2];
var _c = ([[1, [2, 3]]])[0], public = _c[0], package = _c[1];
var _d = [[]], implements = _d.slice(0);
