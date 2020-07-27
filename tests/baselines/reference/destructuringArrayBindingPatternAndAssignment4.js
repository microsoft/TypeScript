//// [destructuringArrayBindingPatternAndAssignment4.ts]
// #35497


declare const data: number[] | null;
const [value] = data; // Error


//// [destructuringArrayBindingPatternAndAssignment4.js]
"use strict";
// #35497
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var _a = __read(data, 1), value = _a[0]; // Error
