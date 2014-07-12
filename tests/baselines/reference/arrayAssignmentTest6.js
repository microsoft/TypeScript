//// [arrayAssignmentTest6.js]
var Test;
(function (Test) {
    var Bug = (function () {
        function Bug() {
        }
        Bug.prototype.tokenize = function (line, tokens, includeStates) {
            return null;
        };
        return Bug;
    })();
    Test.Bug = Bug;
})(Test || (Test = {}));
