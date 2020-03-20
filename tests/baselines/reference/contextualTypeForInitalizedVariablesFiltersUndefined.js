//// [contextualTypeForInitalizedVariablesFiltersUndefined.ts]
const fInferred = ({ a = 0 } = {}) => a;
// const fInferred: ({ a }?: { a?: number; }) => number

const fAnnotated: typeof fInferred = ({ a = 0 } = {}) => a;

//// [contextualTypeForInitalizedVariablesFiltersUndefined.js]
"use strict";
var fInferred = function (_a) {
    var _b = (_a === void 0 ? {} : _a).a, a = _b === void 0 ? 0 : _b;
    return a;
};
// const fInferred: ({ a }?: { a?: number; }) => number
var fAnnotated = function (_c) {
    var _d = (_c === void 0 ? {} : _c).a, a = _d === void 0 ? 0 : _d;
    return a;
};
