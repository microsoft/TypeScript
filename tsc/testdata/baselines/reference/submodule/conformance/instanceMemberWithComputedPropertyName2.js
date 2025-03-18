//// [tests/cases/conformance/classes/propertyMemberDeclarations/instanceMemberWithComputedPropertyName2.ts] ////

//// [instanceMemberWithComputedPropertyName2.ts]
// https://github.com/microsoft/TypeScript/issues/33857
"use strict";
const x = 1;
class C {
    [x]: string;
}


//// [instanceMemberWithComputedPropertyName2.js]
"use strict";
const x = 1;
class C {
    [x];
}
