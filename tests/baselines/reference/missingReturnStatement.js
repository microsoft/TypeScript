//// [tests/cases/compiler/missingReturnStatement.ts] ////

//// [missingReturnStatement.ts]
namespace Test {
    export class Bug {
        public foo():string {
        }
    }    
}


//// [missingReturnStatement.js]
var Test;
(function (Test) {
    var Bug = /** @class */ (function () {
        function Bug() {
        }
        Bug.prototype.foo = function () {
        };
        return Bug;
    }());
    Test.Bug = Bug;
})(Test || (Test = {}));
