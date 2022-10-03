//// [declarationQuotedMembers.ts]
export declare const mapped: { [K in 'a-b-c']: number }
export const example = mapped;

//// [declarationQuotedMembers.js]
"use strict";
exports.__esModule = true;
exports.example = void 0;
exports.example = exports.mapped;


//// [declarationQuotedMembers.d.ts]
export declare const mapped: {
    [K in 'a-b-c']: number;
};
export declare const example: {
    "a-b-c": number;
};
