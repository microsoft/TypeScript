//// [tests/cases/conformance/jsdoc/typedefOnSemicolonClassElement.ts] ////

//// [typedefOnSemicolonClassElement.js]
export class Preferences {
  /** @typedef {string} A */
  ;
  /** @type {A} */
  a = 'ok'
}


//// [typedefOnSemicolonClassElement.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
class Preferences {
    /** @typedef {string} A */
    ;
    /** @type {A} */
    a = 'ok';
}
exports.Preferences = Preferences;


//// [typedefOnSemicolonClassElement.d.ts]
export declare class Preferences {
    type A = string;
    /** @type {A} */
    a: A;
}


//// [DtsFileErrors]


dist/typedefOnSemicolonClassElement.d.ts(2,5): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
dist/typedefOnSemicolonClassElement.d.ts(4,8): error TS2693: 'A' only refers to a type, but is being used as a value here.
dist/typedefOnSemicolonClassElement.d.ts(5,1): error TS1128: Declaration or statement expected.


==== dist/typedefOnSemicolonClassElement.d.ts (3 errors) ====
    export declare class Preferences {
        type A = string;
        ~~~~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
        /** @type {A} */
        a: A;
           ~
!!! error TS2693: 'A' only refers to a type, but is being used as a value here.
    }
    ~
!!! error TS1128: Declaration or statement expected.
    