//// [tests/cases/compiler/callbackArgsDifferByOptionality.ts] ////

//// [callbackArgsDifferByOptionality.ts]
function x3(callback: (x?: 'hi') => number);
function x3(callback: (x: string) => number);
function x3(callback: (x: any) => number) {
    cb();
}

//// [callbackArgsDifferByOptionality.js]
function x3(callback) {
    cb();
}
