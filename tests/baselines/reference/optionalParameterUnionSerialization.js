//// [optionalParameterUnionSerialization.ts]
type u = 1 | 2 | 3 | 4 | 5; 

export const o = {
    mandatory(arg: u): void {arg},
    optional(arg?: u): void {arg},
};


//// [optionalParameterUnionSerialization.js]
"use strict";
exports.__esModule = true;
exports.o = void 0;
exports.o = {
    mandatory: function (arg) { arg; },
    optional: function (arg) { arg; }
};


//// [optionalParameterUnionSerialization.d.ts]
declare type u = 1 | 2 | 3 | 4 | 5;
export declare const o: {
    mandatory(arg: u): void;
    optional(arg?: u | undefined): void;
};
export {};
