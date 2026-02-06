//// [tests/cases/compiler/declarationEmitSymbolPropertyKey.ts] ////

//// [index.d.ts]
declare const lostSymbol: unique symbol;
type lostSymbol = typeof lostSymbol;

type SomeGeneric<T> = {
    [lostSymbol]: T;
};

declare function fn(): SomeGeneric<unknown>;

export {
    lostSymbol,
    fn
};

//// [index.ts]
import { fn } from 'test-pkg';
export const value = fn();


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = void 0;
const test_pkg_1 = require("test-pkg");
exports.value = (0, test_pkg_1.fn)();
