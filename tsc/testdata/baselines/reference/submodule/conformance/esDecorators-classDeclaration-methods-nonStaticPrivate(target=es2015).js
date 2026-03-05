//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #method1() {}
}


//// [esDecorators-classDeclaration-methods-nonStaticPrivate.js]
"use strict";
var _C_instances, _C_method1;
class C {
    constructor() {
        _C_instances.add(this);
    }
}
_C_instances = new WeakSet(), _C_method1 = function _C_method1() { };
