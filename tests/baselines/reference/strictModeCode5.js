//// [strictModeCode5.ts]
"use strict"
var [public] = [1];
var { x: public } = { x: 1 };
var [[private]] = [["hello"]];
var { y: { s: static }, z: { o: { p: package} }} = { y: { s: 1 }, z: { o: { p: 'h' } } };

//// [strictModeCode5.js]
"use strict";
var public = ([1])[0];
var public = ({ x: 1 }).x;
var private = ([["hello"]])[0][0];
var _a = { y: { s: 1 }, z: { o: { p: 'h' } } }, static = _a.y.s, package = _a.z.o.p;
