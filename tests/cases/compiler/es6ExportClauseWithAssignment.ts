// @target: es5, es6
// @module: commonjs
// @noTypesAndSymbols: true

// @filename: server.ts
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
