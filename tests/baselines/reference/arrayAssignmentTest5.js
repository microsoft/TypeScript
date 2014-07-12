//// [arrayAssignmentTest5.js]
var Test;
(function (Test) {
    var Bug = (function () {
        function Bug() {
        }
        Bug.prototype.onEnter = function (line, state, offset) {
            var lineTokens = this.tokenize(line, state, true);
            var tokens = lineTokens.tokens;
            if (tokens.length === 0) {
                return this.onEnter(line, tokens, offset);
            }
        };
        Bug.prototype.tokenize = function (line, state, includeStates) {
            return null;
        };
        return Bug;
    })();
    Test.Bug = Bug;
})(Test || (Test = {}));
