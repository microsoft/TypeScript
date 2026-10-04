//// [tests/cases/compiler/recursiveLetConst.ts] ////

//// [recursiveLetConst.ts]
'use strict'
let x = x + 1;
let [x1] = x1 + 1;
const y = y + 2;
const [y1] = y1 + 1;
for (let v = v; ; ) { }
for (let [v] = v; ;) { }
for (let v in v) { }
for (let v of v) { }
for (let [v] of v) { }
let [x2 = x2] = []
let z0 = () => z0;
let z1 = function () { return z1; }
let z2 = { f() { return z2;}}

//// [recursiveLetConst.js]
'use strict';
let x = x + 1;
let [x1] = x1 + 1;
const y = y + 2;
const [y1] = y1 + 1;
for (let v = v;;) { }
for (let [v] = v;;) { }
for (let v in v) { }
for (let v of v) { }
for (let [v] of v) { }
let [x2 = x2] = [];
let z0 = () => z0;
let z1 = function () { return z1; };
let z2 = { f() { return z2; } };
