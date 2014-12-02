//// [arrayLiteralInNonVarArgParameter.ts]
function panic(val: string[], ...opt: string[]) { }

panic([], 'one', 'two');


//// [arrayLiteralInNonVarArgParameter.js]
function panic(val) {
    var opt = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        opt[_a - 1] = arguments[_a];
    }
}
panic([], 'one', 'two');
