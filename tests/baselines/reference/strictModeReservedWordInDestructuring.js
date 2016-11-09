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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var public = [1][0];
var public = { x: 1 }.x;
var _a = __read([["hello"]][0], 1), private = _a[0];
var _b = { y: { s: 1 }, z: { o: { p: 'h' } } }, static = _b.y.s, package = _b.z.o.p;
var _c = { public: 1, protected: 2 }, public = _c.public, protected = _c.protected;
var _d = { public: 1, protected: 2 }, a = _d.public, b = _d.protected;
