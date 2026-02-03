//// [tests/cases/compiler/declarationEmitTopLevelNodeFromCrossFile.ts] ////

//// [a.ts]
export type X = string;
export const fn = { o: (a?: (X | undefined)[]) => {} };

//// [b.ts]
import {fn} from "./a";
export const m = {                        
    /**
    * leading doc for prop
    */ 
    prop: 1
}


export const x = { p: fn }; 

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = void 0;
exports.fn = { o: function (a) { } };
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.m = void 0;
var a_1 = require("./a");
exports.m = {
    /**
    * leading doc for prop
    */
    prop: 1
};
exports.x = { p: a_1.fn };


//// [a.d.ts]
export type X = string;
export declare const fn: {
    o: (a?: (X | undefined)[]) => void;
};
//// [b.d.ts]
export declare const m: {
    /**
    * leading doc for prop
    */
    prop: number;
};
export declare const x: {
    p: {
        o: (a?: (import("./a").X | undefined)[]) => void;
    };
};
