//// [tests/cases/conformance/jsdoc/tsNoCheckForTypescript.ts] ////

//// [file.ts]
// @ts-nocheck

export const a = 1 + {}; // This is an error, ofc, `Operator '+' cannot be applied to types '1' and '{}'`, which will be suppressed by the `nocheck` comment

export interface Aleph {
    q: number;
}

export class Bet implements Aleph {
    q: string = "lol" // And so will this implements error
}


//// [file.js]
"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet = exports.a = void 0;
exports.a = 1 + {}; // This is an error, ofc, `Operator '+' cannot be applied to types '1' and '{}'`, which will be suppressed by the `nocheck` comment
var Bet = /** @class */ (function () {
    function Bet() {
        this.q = "lol"; // And so will this implements error
    }
    return Bet;
}());
exports.Bet = Bet;


//// [file.d.ts]
export declare const a: any;
export interface Aleph {
    q: number;
}
export declare class Bet implements Aleph {
    q: string;
}


//// [DtsFileErrors]


file.d.ts(6,5): error TS2416: Property 'q' in type 'Bet' is not assignable to the same property in base type 'Aleph'.
  Type 'string' is not assignable to type 'number'.


==== file.d.ts (1 errors) ====
    export declare const a: any;
    export interface Aleph {
        q: number;
    }
    export declare class Bet implements Aleph {
        q: string;
        ~
!!! error TS2416: Property 'q' in type 'Bet' is not assignable to the same property in base type 'Aleph'.
!!! error TS2416:   Type 'string' is not assignable to type 'number'.
    }
    