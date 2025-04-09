//// [tests/cases/compiler/sourceMapValidationWithComments.ts] ////

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
class DebugClass {
    static debugFunc() {
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
//# sourceMappingURL=sourceMapValidationWithComments.js.map