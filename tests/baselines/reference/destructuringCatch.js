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
try {
    throw [0, 1];
}
catch (_a) {
    var a = _a[0], b = _a[1];
    a + b;
}
try {
    throw { a: 0, b: 1 };
}
catch (_b) {
    var a = _b.a, b = _b.b;
    a + b;
}
try {
    throw [{ x: [0], z: 1 }];
}
catch (_c) {
    var _d = _c[0], y = _d.x[0], z = _d.z;
    y + z;
}
// Test of comment ranges. A fix to GH#11755 should update this.
try {
}
catch ( /*Test comment ranges*/_e) {
    var /*a*/ a = _e[0];
}
