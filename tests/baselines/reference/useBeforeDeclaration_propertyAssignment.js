//// [useBeforeDeclaration_propertyAssignment.ts]
export class C {
    public a =  { b: this.b };
    private b = 0;
}


//// [useBeforeDeclaration_propertyAssignment.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
        this.a = { b: this.b };
        this.b = 0;
    }
    return C;
}());
exports.C = C;
