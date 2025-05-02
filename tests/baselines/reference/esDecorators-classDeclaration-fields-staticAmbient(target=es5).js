//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticAmbient.ts] ////

//// [esDecorators-classDeclaration-fields-staticAmbient.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static declare field1 = 1;
    @dec(2) static declare ["field2"] = 2;
    @dec(3) static declare [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-staticAmbient.js]
var field3 = "field3";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
