//// [tests/cases/conformance/classes/propertyMemberDeclarations/instanceMemberWithComputedPropertyName2.ts] ////

//// [instanceMemberWithComputedPropertyName2.ts]
// https://github.com/microsoft/TypeScript/issues/33857
"use strict";
const x = 1;
class C {
    [x]: string;
}


//// [instanceMemberWithComputedPropertyName2.js]
// https://github.com/microsoft/TypeScript/issues/33857
"use strict";
var _a;
const x = 1;
class C {
    constructor() {
        Object.defineProperty(this, _a, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
_a = x;
