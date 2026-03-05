//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) get #method1() { return 0; }
    @dec(2) set #method1(value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.js]
"use strict";
var _C_instances, _C_method1_get, _C_method1_set;
class C {
    constructor() {
        _C_instances.add(this);
    }
}
_C_instances = new WeakSet(), _C_method1_get = function _C_method1_get() { return 0; }, _C_method1_set = function _C_method1_set(value) { };
