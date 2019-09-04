//// [useBeforeDeclaration_propertyDeclaration.ts]
class A {
    num: number;
    constructor(num:number) {
        this.num = num;
    }

    computed = this.num * 10;
}

//// [useBeforeDeclaration_propertyDeclaration.js]
"use strict";
var A = /** @class */ (function () {
    function A(num) {
        this.computed = this.num * 10;
        this.num = num;
    }
    return A;
}());
