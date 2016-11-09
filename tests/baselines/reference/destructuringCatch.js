//// [destructuringCatch.ts]

try {
    throw [0, 1];
}
catch ([a, b]) {
    a + b;
}

try {
    throw { a: 0, b: 1 };
}
catch ({a, b}) {
    a + b;
}

try {
    throw [{ x: [0], z: 1 }];
}
catch ([{x: [y], z}]) {
    y + z;
}

// Test of comment ranges. A fix to GH#11755 should update this.
try {
}
catch (/*Test comment ranges*/[/*a*/a]) {

}


//// [destructuringCatch.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
try {
    throw [0, 1];
}
catch (_a) {
    var _b = __read(_a, 2), a = _b[0], b = _b[1];
    a + b;
}
try {
    throw { a: 0, b: 1 };
}
catch (_c) {
    var a = _c.a, b = _c.b;
    a + b;
}
try {
    throw [{ x: [0], z: 1 }];
}
catch (_d) {
    var _e = __read(_d, 1), _f = _e[0], _g = __read(_f.x, 1), y = _g[0], z = _f.z;
    y + z;
}
// Test of comment ranges. A fix to GH#11755 should update this.
try {
}
catch (_h) {
    var /*Test comment ranges*/ _j = __read(_h, 1), /*a*/ a = _j[0];
}
