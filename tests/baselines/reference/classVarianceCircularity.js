//// [tests/cases/compiler/classVarianceCircularity.ts] ////

//// [classVarianceCircularity.ts]
// Issue #52813

function f() {
    const b = new Bar();
    // Uncomment to create error
    console.log(b.Value);
}

class Bar<T> {
    num!: number;
    // Or swap these two lines
    Field: number = (this as Bar<any>).num;
    Value = (this as Bar<any>).num;
}

//// [classVarianceCircularity.js]
"use strict";
// Issue #52813
function f() {
    var b = new Bar();
    // Uncomment to create error
    console.log(b.Value);
}
var Bar = /** @class */ (function () {
    function Bar() {
        // Or swap these two lines
        this.Field = this.num;
        this.Value = this.num;
    }
    return Bar;
}());
