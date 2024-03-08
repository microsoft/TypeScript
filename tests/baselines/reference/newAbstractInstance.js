//// [tests/cases/compiler/newAbstractInstance.ts] ////

//// [newAbstractInstance.ts]
abstract class B { }
declare const b: B;
new b();


//// [newAbstractInstance.js]
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
new b();
