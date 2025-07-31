//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsDefault2.ts] ////

//// [index1.js]
export const _default = class {};

export default 12;
/**
 * @typedef {string | number} default
 */


//// [index1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._default = void 0;
const _default = class {
};
exports._default = _default;
exports.default = 12;
/**
 * @typedef {string | number} default
 */


//// [index1.d.ts]
export declare const _default: {
    new (): {};
};
declare const _default_1: number;
export default _default_1;
export type default = string | number;
/**
 * @typedef {string | number} default
 */


//// [DtsFileErrors]


out/index1.d.ts(6,1): error TS1128: Declaration or statement expected.
out/index1.d.ts(6,8): error TS2304: Cannot find name 'type'.
out/index1.d.ts(6,13): error TS2457: Type alias name cannot be 'default'.
out/index1.d.ts(6,21): error TS1128: Declaration or statement expected.
out/index1.d.ts(6,23): error TS2693: 'string' only refers to a type, but is being used as a value here.
out/index1.d.ts(6,32): error TS2693: 'number' only refers to a type, but is being used as a value here.


==== out/index1.d.ts (6 errors) ====
    export declare const _default: {
        new (): {};
    };
    declare const _default_1: number;
    export default _default_1;
    export type default = string | number;
    ~~~~~~
!!! error TS1128: Declaration or statement expected.
           ~~~~
!!! error TS2304: Cannot find name 'type'.
                ~~~~~~~
!!! error TS2457: Type alias name cannot be 'default'.
                        ~
!!! error TS1128: Declaration or statement expected.
                          ~~~~~~
!!! error TS2693: 'string' only refers to a type, but is being used as a value here.
                                   ~~~~~~
!!! error TS2693: 'number' only refers to a type, but is being used as a value here.
    /**
     * @typedef {string | number} default
     */
    