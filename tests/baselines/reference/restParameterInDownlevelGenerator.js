//// [restParameterInDownlevelGenerator.ts]
// https://github.com/Microsoft/TypeScript/issues/30653
function * mergeStringLists(...strings: string[]) {
    for (var str of strings);
}

//// [restParameterInDownlevelGenerator.js]
// https://github.com/Microsoft/TypeScript/issues/30653
function mergeStringLists() {
    var _i, strings_1, strings_1_1, str;
    var e_1, _a;
    var strings = [];
    for (_i = 0; _i < arguments.length; _i++) {
        strings[_i] = arguments[_i];
    }
    return __generator(this, function (_b) {
        try {
            for (strings_1 = __values(strings), strings_1_1 = strings_1.next(); !strings_1_1.done; strings_1_1 = strings_1.next()) {
                str = strings_1_1.value;
                ;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (strings_1_1 && !strings_1_1.done && (_a = strings_1.return)) _a.call(strings_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [2 /*return*/];
    });
}
