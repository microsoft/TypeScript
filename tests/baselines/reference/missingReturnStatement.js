//// [tests/cases/compiler/missingReturnStatement.ts] ////

//// [missingReturnStatement.ts]
namespace Test {
    export class Bug {
        public foo():string {
        }
    }    
}


//// [missingReturnStatement.js]
"use strict";
var Test;
(function (Test) {
    class Bug {
        foo() {
        }
    }
    Test.Bug = Bug;
})(Test || (Test = {}));
