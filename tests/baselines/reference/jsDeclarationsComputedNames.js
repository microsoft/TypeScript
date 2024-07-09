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
var _a, _b;
var TopLevelSym = Symbol();
var InnerSym = Symbol();
module.exports = (_a = {},
    _a[TopLevelSym] = function (x) {
        if (x === void 0) { x = 12; }
        return x;
    },
    _a.items = (_b = {},
        _b[InnerSym] = function (arg) {
            if (arg === void 0) { arg = { x: 12 }; }
            return arg.x;
        },
        _b),
    _a);
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var TopLevelSym = Symbol();
var InnerSym = Symbol();
var MyClass = /** @class */ (function () {
    /**
     * @param {typeof TopLevelSym | typeof InnerSym} _p
     */
    function MyClass(_p) {
        if (_p === void 0) { _p = InnerSym; }
        this[_b] = "ok";
        // switch on _p
    }
    var _a, _b;
    _a = TopLevelSym, _b = InnerSym;
    MyClass[_a] = 12;
    return MyClass;
}());
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
