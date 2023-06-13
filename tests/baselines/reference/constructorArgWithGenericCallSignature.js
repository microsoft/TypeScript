//// [tests/cases/compiler/constructorArgWithGenericCallSignature.ts] ////

//// [constructorArgWithGenericCallSignature.ts]
module Test {
    export interface MyFunc {
        <T>(value1: T): T;
    }
    export class MyClass {
        constructor(func: MyFunc) { }
    }
 
 export function F(func: MyFunc) { }
}
var func: Test.MyFunc;
Test.F(func); // OK
var test = new Test.MyClass(func); // Should be OK


//// [constructorArgWithGenericCallSignature.js]
var Test;
(function (Test) {
    var MyClass = /** @class */ (function () {
        function MyClass(func) {
        }
        return MyClass;
    }());
    Test.MyClass = MyClass;
    function F(func) { }
    Test.F = F;
})(Test || (Test = {}));
var func;
Test.F(func); // OK
var test = new Test.MyClass(func); // Should be OK
