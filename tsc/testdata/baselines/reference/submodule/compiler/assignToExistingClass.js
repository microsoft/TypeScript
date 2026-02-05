//// [tests/cases/compiler/assignToExistingClass.ts] ////

//// [assignToExistingClass.ts]
namespace Test {
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
"use strict";
var Test;
(function (Test) {
    class Mocked {
        myProp;
    }
    class Tester {
        willThrowError() {
            Mocked = Mocked || function () {
                return { myProp: "test" };
            };
        }
    }
})(Test || (Test = {}));
