//// [server.ts]
var foo = 2;
foo = 3;

var baz = 3;
baz = 4;

var buzz = 10;
buzz += 3;

var bizz = 8;
bizz++;
bizz--;
++bizz;

while (!!--foo) {}

for (foo of [1, 2]) {}

export var exportedFoo = 0;
for (exportedFoo of [1, 2]) {}
for ([exportedFoo] of [[1]]) {}
exportedFoo = 2;
exportedFoo--;

export var doubleExportedFoo = 0;
for (doubleExportedFoo of [1, 2]);
doubleExportedFoo = 2;
doubleExportedFoo++;
++doubleExportedFoo;

for ([doubleExportedFoo] of [[1]]);

doubleExportedFoo = baz++;

let bar = '';
for (bar in {}) {}

function nested() {
    doubleExportedFoo = baz--;
    for (doubleExportedFoo of []) console.log(doubleExportedFoo);
}

export { foo, bar, baz, baz as quux, buzz, bizz, doubleExportedFoo as otherFoo };


//// [server.js]
"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var foo = 2;
exports.foo = foo;
exports.foo = foo = 3;
var baz = 3;
exports.baz = baz;
exports.quux = baz;
exports.quux = exports.baz = baz = 4;
var buzz = 10;
exports.buzz = buzz;
exports.buzz = buzz += 3;
var bizz = 8;
exports.bizz = bizz;
_a = +bizz, exports.bizz = bizz = _a + 1, _a;
_b = +bizz, exports.bizz = bizz = _b - 1, _b;
exports.bizz = ++bizz;
while (!!(exports.foo = --foo)) { }
for (foo of [1, 2]) {
    exports.foo = foo;
}
exports.exportedFoo = 0;
for (exports.exportedFoo of [1, 2]) { }
for ([exports.exportedFoo] of [[1]]) { }
exports.exportedFoo = 2;
exports.exportedFoo--;
exports.doubleExportedFoo = 0;
exports.otherFoo = exports.doubleExportedFoo;
for (exports.doubleExportedFoo of [1, 2]) {
    exports.otherFoo = exports.doubleExportedFoo;
    ;
}
exports.otherFoo = exports.doubleExportedFoo = 2;
_c = +exports.doubleExportedFoo, exports.otherFoo = exports.doubleExportedFoo = _c + 1, _c;
exports.otherFoo = ++exports.doubleExportedFoo;
for (var _e of [[1]]) {
    exports.otherFoo = exports.doubleExportedFoo = _e[0];
    ;
}
exports.otherFoo = exports.doubleExportedFoo = (_d = +baz, exports.quux = exports.baz = baz = _d + 1, _d);
let bar = '';
exports.bar = bar;
for (bar in {}) {
    exports.bar = bar;
}
function nested() {
    var _a;
    exports.otherFoo = exports.doubleExportedFoo = (_a = +baz, exports.quux = exports.baz = baz = _a - 1, _a);
    for (exports.doubleExportedFoo of []) {
        exports.otherFoo = exports.doubleExportedFoo;
        console.log(exports.doubleExportedFoo);
    }
}
