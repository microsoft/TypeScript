//// [tests/cases/compiler/arrayIterationLibES5TargetDifferent.ts] ////

//// [arrayIterationLibES5TargetDifferent.ts]
declare function log(message?: any): void;

for (const x of [1, 2, 3]) {
    log(x);
}

declare const aString: string;

for (const x of aString) {
    log(x);
}

declare const aNumber: number;

for (const x of aNumber) {
    log(x);
}

declare const anObject: { foo: string };

for (const x of anObject) {
    log(x);
}

//// [arrayIterationLibES5TargetDifferent.js]
"use strict";
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var x = _a[_i];
    log(x);
}
for (var _b = 0, aString_1 = aString; _b < aString_1.length; _b++) {
    var x = aString_1[_b];
    log(x);
}
for (var _c = 0, aNumber_1 = aNumber; _c < aNumber_1.length; _c++) {
    var x = aNumber_1[_c];
    log(x);
}
for (var _d = 0, anObject_1 = anObject; _d < anObject_1.length; _d++) {
    var x = anObject_1[_d];
    log(x);
}
