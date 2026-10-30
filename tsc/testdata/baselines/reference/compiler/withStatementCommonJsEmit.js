//// [tests/cases/compiler/withStatementCommonJsEmit.ts] ////

//// [withStatementCommonJsEmit.cts]
declare const obj: object;

with (obj) export let a;
with (obj) export let d = 1;
with (obj) var local = 2;
with (obj) {
    export let e;
}


//// [withStatementCommonJsEmit.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
with (obj)
    ;
with (obj)
    exports.d = 1;
with (obj)
    var local = 2;
with (obj) {
}
