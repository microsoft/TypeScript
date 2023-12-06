//// [tests/cases/compiler/strictModeReservedWordInDestructuring.ts] ////

//// [strictModeReservedWordInDestructuring.ts]
"use strict"
var [public] = [1];
var { x: public } = { x: 1 };
var [[private]] = [["hello"]];
var { y: { s: static }, z: { o: { p: package } }} = { y: { s: 1 }, z: { o: { p: 'h' } } };
var { public, protected } = { public: 1, protected: 2 };
var { public: a, protected: b } = { public: 1, protected: 2 };


//// [strictModeReservedWordInDestructuring.js]
"use strict";
var public = [1][0];
var public = { x: 1 }.x;
var private = [["hello"]][0][0];
var _a = { y: { s: 1 }, z: { o: { p: 'h' } } }, static = _a.y.s, package = _a.z.o.p;
var _b = { public: 1, protected: 2 }, public = _b.public, protected = _b.protected;
var _c = { public: 1, protected: 2 }, a = _c.public, b = _c.protected;
