//// [DeclarationErrorsNoEmitOnError.ts]
type T = { x : number }
export interface I {
    f: T;   
}

//// [DeclarationErrorsNoEmitOnError.js]
"use strict";
exports.__esModule = true;


//// [DeclarationErrorsNoEmitOnError.d.ts]
declare type T = {
    x: number;
};
export interface I {
    f: T;
}
export {};
