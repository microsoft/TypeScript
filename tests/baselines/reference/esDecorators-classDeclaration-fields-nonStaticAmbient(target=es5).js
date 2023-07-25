//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticAmbient.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticAmbient.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) declare field1: number;
    @dec(2) declare ["field2"]: number;
    @dec(3) declare [field3]: number;
}


//// [esDecorators-classDeclaration-fields-nonStaticAmbient.js]
var field3 = "field3";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
