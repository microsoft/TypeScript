//// [tests/cases/compiler/classVarianceResolveCircularity1.ts] ////

//// [classVarianceResolveCircularity1.ts]
// Issue #52813

class Bar<T> {
    num!: number;
    Value = callme(this).num;
    Field: number = callme(this).num;
}
declare function callme(x: Bar<any>): Bar<any>;
declare function callme(x: object): string;

//// [classVarianceResolveCircularity1.js]
"use strict";
// Issue #52813
var Bar = /** @class */ (function () {
    function Bar() {
        this.Value = callme(this).num;
        this.Field = callme(this).num;
    }
    return Bar;
}());
