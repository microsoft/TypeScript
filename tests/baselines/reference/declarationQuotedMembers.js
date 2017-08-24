//// [declarationQuotedMembers.ts]
export type Timespans =
    '1 hour' | '4 hours' | '12 hours' | '1 day' | '3 days' | '1 week' | '1 month';
const TIMESPANS: {[k in Timespans]: number} = {
    '1 hour': 1 * 60 * 60 * 1000,
    '4 hours': 4 * 60 * 60 * 1000,
    '12 hours': 12 * 60 * 60 * 1000,
    '1 day': 1 * 24 * 60 * 60 * 1000,
    '3 days': 3 * 24 * 60 * 60 * 1000,
    '1 week': 7 * 24 * 60 * 60 * 1000,
    '1 month': 30 * 24 * 60 * 60 * 1000,
};

export class Foo {
    timespans = TIMESPANS;
};

export declare const mapped: { [K in 'a-b-c']: number }
export const example = mapped;

//// [declarationQuotedMembers.js]
"use strict";
exports.__esModule = true;
var TIMESPANS = {
    '1 hour': 1 * 60 * 60 * 1000,
    '4 hours': 4 * 60 * 60 * 1000,
    '12 hours': 12 * 60 * 60 * 1000,
    '1 day': 1 * 24 * 60 * 60 * 1000,
    '3 days': 3 * 24 * 60 * 60 * 1000,
    '1 week': 7 * 24 * 60 * 60 * 1000,
    '1 month': 30 * 24 * 60 * 60 * 1000
};
var Foo = /** @class */ (function () {
    function Foo() {
        this.timespans = TIMESPANS;
    }
    return Foo;
}());
exports.Foo = Foo;
;
exports.example = exports.mapped;


//// [declarationQuotedMembers.d.ts]
export declare type Timespans = '1 hour' | '4 hours' | '12 hours' | '1 day' | '3 days' | '1 week' | '1 month';
export declare class Foo {
    timespans: {
        "1 hour": number;
        "4 hours": number;
        "12 hours": number;
        "1 day": number;
        "3 days": number;
        "1 week": number;
        "1 month": number;
    };
}
export declare const mapped: {
    [K in 'a-b-c']: number;
};
export declare const example: {
    "a-b-c": number;
};
