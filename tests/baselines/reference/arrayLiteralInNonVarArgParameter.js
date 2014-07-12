//// [arrayLiteralInNonVarArgParameter.ts]
function panic(val: string[], ...opt: string[]) { }

panic([], 'one', 'two');


//// [arrayLiteralInNonVarArgParameter.js]
function panic(val) {
    var opt = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        opt[_i] = arguments[_i + 1];
    }
}

panic([], 'one', 'two');
