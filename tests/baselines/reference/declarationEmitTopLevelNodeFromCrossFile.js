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
export const fn = { o: (a) => { } };
//// [b.js]
import { fn } from "./a";
export const m = {
    /**
    * leading doc for prop
    */
    prop: 1
};
export const x = { p: fn };


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
