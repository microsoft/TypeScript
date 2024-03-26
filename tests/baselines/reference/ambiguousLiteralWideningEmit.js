//// [tests/cases/compiler/ambiguousLiteralWideningEmit.ts] ////

//// [ambiguousLiteralWideningEmit.ts]
declare function pad(n: number | string): string;

export default (dateString: string, type: 'date' | 'month' | 'year'): string => {
    const [year, month = 1, date = 1] = dateString.split('-')
    return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}


//// [ambiguousLiteralWideningEmit.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (dateString, type) {
    var _a = dateString.split('-'), year = _a[0], _b = _a[1], month = _b === void 0 ? 1 : _b, _c = _a[2], date = _c === void 0 ? 1 : _c;
    return "".concat(year, "-").concat(pad(month), "-").concat(pad(date)).substr(0, { date: 10, month: 7, year: 4 }[type]);
});


//// [ambiguousLiteralWideningEmit.d.ts]
declare const _default: (dateString: string, type: 'date' | 'month' | 'year') => string;
export default _default;
