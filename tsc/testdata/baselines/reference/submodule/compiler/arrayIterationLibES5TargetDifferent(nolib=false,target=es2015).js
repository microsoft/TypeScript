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
for (const x of [1, 2, 3]) {
    log(x);
}
for (const x of aString) {
    log(x);
}
for (const x of aNumber) {
    log(x);
}
for (const x of anObject) {
    log(x);
}
