//// [tests/cases/compiler/declarationEmitReadonlyComputedProperty.ts] ////

//// [bug.ts]
export const SYMBOL = Symbol()

export interface Interface {
  readonly [SYMBOL]: string; // remove readonly and @showEmit to see the expected error
}

export function createInstance(): Interface {
  return {
    [SYMBOL]: ''
  }
}

//// [index.ts]
import { createInstance } from './bug'

export const spread = {
  ...createInstance(),
}

//// [bug.js]
"use strict";
exports.__esModule = true;
exports.createInstance = exports.SYMBOL = void 0;
exports.SYMBOL = Symbol();
function createInstance() {
    var _a;
    return _a = {},
        _a[exports.SYMBOL] = '',
        _a;
}
exports.createInstance = createInstance;
//// [index.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.spread = void 0;
var bug_1 = require("./bug");
exports.spread = __assign({}, (0, bug_1.createInstance)());


//// [bug.d.ts]
export declare const SYMBOL: unique symbol;
export interface Interface {
    readonly [SYMBOL]: string;
}
export declare function createInstance(): Interface;
