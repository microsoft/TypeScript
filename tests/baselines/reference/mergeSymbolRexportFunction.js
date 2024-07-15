//// [tests/cases/compiler/mergeSymbolRexportFunction.ts] ////

//// [main.ts]
import {Row} from '.'
Row();

//// [a.d.ts]
import '.'
declare module '.' {
  const Row: () => void;
}

//// [index.d.ts]
export type {Row} from './common';

//// [common.d.ts]
export declare function Row(): void; 

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
(0, _1.Row)();
