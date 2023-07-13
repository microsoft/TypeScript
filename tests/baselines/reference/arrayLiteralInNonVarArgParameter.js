//// [tests/cases/compiler/arrayLiteralInNonVarArgParameter.ts] ////

//// [arrayLiteralInNonVarArgParameter.ts]
function panic(val: string[], ...opt: string[]) { }

panic([], 'one', 'two');


//// [arrayLiteralInNonVarArgParameter.js]
function panic(val) {
    var opt = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        opt[_i - 1] = arguments[_i];
    }
}
panic([], 'one', 'two');
