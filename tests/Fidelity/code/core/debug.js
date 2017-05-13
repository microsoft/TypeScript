///<reference path='references.ts' />
var TypeScript;
(function (TypeScript) {
    (function (AssertionLevel) {
        AssertionLevel[AssertionLevel["None"] = 0] = "None";
        AssertionLevel[AssertionLevel["Normal"] = 1] = "Normal";
        AssertionLevel[AssertionLevel["Aggressive"] = 2] = "Aggressive";
        AssertionLevel[AssertionLevel["VeryAggressive"] = 3] = "VeryAggressive";
    })(TypeScript.AssertionLevel || (TypeScript.AssertionLevel = {}));
    var AssertionLevel = TypeScript.AssertionLevel;
    var Debug = (function () {
        function Debug() {
        }
        Debug.shouldAssert = function (level) {
            return this.currentAssertionLevel >= level;
        };
        Debug.assert = function (expression, message, verboseDebugInfo) {
            if (message === void 0) { message = ""; }
            if (verboseDebugInfo === void 0) { verboseDebugInfo = null; }
            if (!expression) {
                var verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information:" + verboseDebugInfo();
                }
                throw new Error("Debug Failure. False expression: " + message + verboseDebugString);
            }
        };
        Debug.fail = function (message) {
            Debug.assert(false, message);
        };
        Debug.currentAssertionLevel = 0 /* None */;
        return Debug;
    })();
    TypeScript.Debug = Debug;
})(TypeScript || (TypeScript = {}));
