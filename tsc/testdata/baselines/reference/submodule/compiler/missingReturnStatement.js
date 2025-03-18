//// [tests/cases/compiler/missingReturnStatement.ts] ////

//// [missingReturnStatement.ts]
module Test {
    export class Bug {
        public foo():string {
        }
    }    
}


//// [missingReturnStatement.js]
var Test;
(function (Test) {
    class Bug {
        foo() {
        }
    }
    Test.Bug = Bug;
})(Test || (Test = {}));
