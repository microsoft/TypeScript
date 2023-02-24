//// [numberWrapper.ts]
declare let aNumber: number;
declare let aNumberWrapper: Number;

function a() {
    aNumber = aNumberWrapper;
}

function b() {
    aNumberWrapper = aNumber;
}


//// [numberWrapper.js]
"use strict";
function a() {
    aNumber = aNumberWrapper;
}
function b() {
    aNumberWrapper = aNumber;
}
