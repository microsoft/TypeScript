//// [typeGuardAccordingToProperty2.ts]
interface A {
    kind: 'A';
    symbol: object;
    fileName: string;
}

interface B {
    kind: 'B';
}

declare var s: A | B;

if (s.kind === 'A') {
    if (s.symbol) {     // this is a truthy condition, we could narrow it, but it has a property `symbol`, so do nothing.
        s;    // A
    } else {
        s.fileName;  // A
    }

    if (s) {    // this is another truthy condition, now it is alone, so narrow it.
        s; // A
    } else {
        s; // never
    }
}

//// [typeGuardAccordingToProperty2.js]
"use strict";
if (s.kind === 'A') {
    if (s.symbol) { // this is a truthy condition, we could narrow it, but it has a property `symbol`, so do nothing.
        s; // A
    }
    else {
        s.fileName; // A
    }
    if (s) { // this is another truthy condition, now it is alone, so narrow it.
        s; // A
    }
    else {
        s; // never
    }
}
