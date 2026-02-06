//// [tests/cases/compiler/downlevelIterationDeprecated.ts] ////

//// [downlevelIterationDeprecated.ts]
declare const log: (s: string) => void;

declare const arr: string[];

for (const a of arr) {
    log(a);
}

//// [downlevelIterationDeprecated.js]
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
try {
    for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
        var a = arr_1_1.value;
        log(a);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
    }
    finally { if (e_1) throw e_1.error; }
}
