//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-static.ts] ////

//// [esDecorators-classDeclaration-fields-static.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static field1 = 1;
    @dec(2) static ["field2"] = 2;
    @dec(3) static [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-static.js]
"use strict";
var _a;
const field3 = "field3";
class C {
}
_a = field3;
Object.defineProperty(C, "field1", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 1
});
Object.defineProperty(C, "field2", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 2
});
Object.defineProperty(C, _a, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 3
});
