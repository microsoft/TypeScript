//// [assignToExistingClass.ts]
module Test {
    class Mocked {
        myProp: string;
    }

    class Tester {
        willThrowError() {
            Mocked = Mocked || function () { // => Error: Invalid left-hand side of assignment expression.
                return { myProp: "test" };
            };
        }
    }
 
}


//// [assignToExistingClass.js]
var Test;
(function (Test) {
    var Mocked = (function () {
        function Mocked() {
        }
        return Mocked;
    }());
    var Tester = (function () {
        function Tester() {
        }
        Tester.prototype.willThrowError = function () {
            Mocked = Mocked || function () {
                return { myProp: "test" };
            };
        };
        return Tester;
    }());
})(Test || (Test = {}));
