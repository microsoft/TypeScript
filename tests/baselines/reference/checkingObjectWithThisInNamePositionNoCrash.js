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
    doit: function () {
        var _a;
        return _a = {},
            _a[this.a] = "",
            _a;
    }
};


//// [checkingObjectWithThisInNamePositionNoCrash.d.ts]
export declare const thing: {
    doit(): {
        [x: number]: string;
    };
};
