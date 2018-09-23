//// [missingReturnStatement.ts]
module Test {
    export class Bug {
        public foo():string {
        }
    }    
}


//// [missingReturnStatement.js]
var Test = Test || (Test = {});
(function (Test) {
    var Bug = /** @class */ (function () {
        function Bug() {
        }
        Bug.prototype.foo = function () {
        };
        return Bug;
    }());
    Test.Bug = Bug;
})(Test);
