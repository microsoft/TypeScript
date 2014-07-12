//// [commentsOnReturnStatement1.ts]
class DebugClass {
    public static debugFunc() {
        // Start Debugger Test Code
        var i = 0;

        // End Debugger Test Code
        return true;
    }
}

//// [commentsOnReturnStatement1.js]
var DebugClass = (function () {
    function DebugClass() {
    }
    DebugClass.debugFunc = function () {
        var i = 0;
        return true;
    };
    return DebugClass;
})();
