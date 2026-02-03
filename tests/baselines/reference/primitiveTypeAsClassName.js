//// [tests/cases/compiler/primitiveTypeAsClassName.ts] ////

//// [primitiveTypeAsClassName.ts]
class any {}

//// [primitiveTypeAsClassName.js]
var any = /** @class */ (function () {
    function any() {
    }
    return any;
}());
