//// [tests/cases/conformance/classes/classDeclarations/classWithPredefinedTypesAsNames2.ts] ////

//// [classWithPredefinedTypesAsNames2.ts]
// classes cannot use predefined types as names

class void {}

//// [classWithPredefinedTypesAsNames2.js]
// classes cannot use predefined types as names
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
void {};
