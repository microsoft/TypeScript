//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivate.js]
"use strict";
var _C_field1;
class C {
    constructor() {
        _C_field1.set(this, 0);
    }
}
_C_field1 = new WeakMap();
