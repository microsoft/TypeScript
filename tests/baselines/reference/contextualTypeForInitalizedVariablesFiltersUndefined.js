//// [contextualTypeForInitalizedVariablesFiltersUndefined.ts]
const fInferred = ({ a = 0 } = {}) => a;
// const fInferred: ({ a }?: { a?: number; }) => number

const fAnnotated: typeof fInferred = ({ a = 0 } = {}) => a;

declare var t: { s: string } | undefined;
const { s } = t;
function fst({ s } = t) { }


//// [contextualTypeForInitalizedVariablesFiltersUndefined.js]
"use strict";
var fInferred = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? 0 : _c;
    return a;
};
// const fInferred: ({ a }?: { a?: number; }) => number
var fAnnotated = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? 0 : _c;
    return a;
};
var s = t.s;
function fst(_a) {
    var _b = _a === void 0 ? t : _a, s = _b.s;
}
