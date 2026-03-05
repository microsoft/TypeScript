//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStatic.ts] ////

//// [esDecorators-classDeclaration-fields-nonStatic.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) field1 = 1;
    @dec(2) ["field2"] = 2;
    @dec(3) [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-nonStatic.js]
"use strict";
var _a;
const field3 = "field3";
class C {
    constructor() {
        this.field1 = 1;
        this["field2"] = 2;
        this[_a] = 3;
    }
}
_a = field3;
