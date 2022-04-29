//// [localVariablesReturnedFromCatchBlocks.ts]
function f() {
    try {
    } catch (e) {
        var stack2 = e.stack;
        return stack2; //error TS2095: Could not find symbol 'stack2'.
    }
}

//// [localVariablesReturnedFromCatchBlocks.js]
function f() {
    try {
    }
    catch (e) {
        var stack2 = e.stack;
        return stack2; //error TS2095: Could not find symbol 'stack2'.
    }
}
