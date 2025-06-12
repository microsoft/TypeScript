//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsComputedNames.ts] ////

//// [index.js]
const TopLevelSym = Symbol();
const InnerSym = Symbol();
module.exports = {
    [TopLevelSym](x = 12) {
        return x;
    },
    items: {
        [InnerSym]: (arg = {x: 12}) => arg.x
    }
}

//// [index2.js]
const TopLevelSym = Symbol();
const InnerSym = Symbol();

export class MyClass {
    static [TopLevelSym] = 12;
    [InnerSym] = "ok";
    /**
     * @param {typeof TopLevelSym | typeof InnerSym} _p
     */
    constructor(_p = InnerSym) {
        // switch on _p
    }
}


//// [index.js]
const TopLevelSym = Symbol();
const InnerSym = Symbol();
module.exports = {
    [TopLevelSym](x = 12) {
        return x;
    },
    items: {
        [InnerSym]: (arg = { x: 12 }) => arg.x
    }
};
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
const TopLevelSym = Symbol();
const InnerSym = Symbol();
let MyClass = (() => {
    var _a, _b;
    class MyClass {
        /**
         * @param {typeof TopLevelSym | typeof InnerSym} _p
         */
        constructor(_p = InnerSym) {
            this[_b] = "ok";
            // switch on _p
        }
    }
    _a = TopLevelSym, _b = InnerSym;
    MyClass[_a] = 12;
    return MyClass;
})();
exports.MyClass = MyClass;


//// [index.d.ts]
declare const _exports: {
    [TopLevelSym](x?: number): number;
    items: {
        [InnerSym]: (arg?: {
            x: number;
        }) => number;
    };
};
export = _exports;
declare const TopLevelSym: unique symbol;
declare const InnerSym: unique symbol;
//// [index2.d.ts]
export class MyClass {
    static [TopLevelSym]: number;
    /**
     * @param {typeof TopLevelSym | typeof InnerSym} _p
     */
    constructor(_p?: typeof TopLevelSym | typeof InnerSym);
    [InnerSym]: string;
}
declare const InnerSym: unique symbol;
declare const TopLevelSym: unique symbol;
export {};
