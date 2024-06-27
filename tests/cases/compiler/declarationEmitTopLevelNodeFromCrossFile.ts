// @declaration: true
// @filename: a.ts
export type X = string;
export const fn = { o: (a?: (X | undefined)[]) => {} };

// @filename: b.ts
import {fn} from "./a";
export const m = {                        
    /**
    * leading doc for prop
    */ 
    prop: 1
}


export const x = { p: fn }; 