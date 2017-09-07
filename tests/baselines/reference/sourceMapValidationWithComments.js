//// [sourceMapValidationWithComments.ts]
class DebugClass {

    public static debugFunc() {

        // Start Debugger Test Code
        var i = 0;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        // End Debugger Test Code


        return true;
    }
}

//// [sourceMapValidationWithComments.js]
var DebugClass = /** @class */ (function () {
    function DebugClass() {
    }
    DebugClass.debugFunc = function () {
        // Start Debugger Test Code
        var i = 0;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        // End Debugger Test Code
        return true;
    };
    return DebugClass;
}());
//# sourceMappingURL=sourceMapValidationWithComments.js.map