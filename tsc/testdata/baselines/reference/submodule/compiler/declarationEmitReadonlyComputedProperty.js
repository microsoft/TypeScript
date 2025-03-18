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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYMBOL = void 0;
exports.createInstance = createInstance;
exports.SYMBOL = Symbol();
function createInstance() {
    return {
        [exports.SYMBOL]: ''
    };
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spread = void 0;
const bug_1 = require("./bug");
exports.spread = {
    ...(0, bug_1.createInstance)(),
};
