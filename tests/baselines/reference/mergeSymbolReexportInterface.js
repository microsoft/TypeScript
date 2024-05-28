//// [tests/cases/compiler/mergeSymbolReexportInterface.ts] ////

//// [main.ts]
import {Row2, C} from '.'
const x : Row2 = { }
const y : C = { s: '' }

 
//// [a.d.ts]
import '.'
declare module '.' {
  type Row2 = { a: string }
  type C = { s : string }
}
 
//// [index.d.ts]
export type {Row2} from './common';
 
//// [common.d.ts]
export interface Row2 { b: string }

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = {};
var y = { s: '' };
