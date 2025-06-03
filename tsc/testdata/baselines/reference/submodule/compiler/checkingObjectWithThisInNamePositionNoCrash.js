//// [tests/cases/compiler/checkingObjectWithThisInNamePositionNoCrash.ts] ////

//// [checkingObjectWithThisInNamePositionNoCrash.ts]
export const thing = {
    doit() {
        return {
            [this.a]: "", // should refer to the outer object with the doit method, notably not present
        }
    }
}

//// [checkingObjectWithThisInNamePositionNoCrash.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thing = void 0;
exports.thing = {
    doit() {
        return {
            [this.a]: "", // should refer to the outer object with the doit method, notably not present
        };
    }
};


//// [checkingObjectWithThisInNamePositionNoCrash.d.ts]
export declare const thing: {
    doit(): any;
};
