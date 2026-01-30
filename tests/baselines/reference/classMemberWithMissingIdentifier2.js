//// [tests/cases/compiler/classMemberWithMissingIdentifier2.ts] ////

//// [classMemberWithMissingIdentifier2.ts]
class C { 
    public {[name:string]:VariableDeclaration};
}

//// [classMemberWithMissingIdentifier2.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
{
    [name, string];
    VariableDeclaration;
}
;
