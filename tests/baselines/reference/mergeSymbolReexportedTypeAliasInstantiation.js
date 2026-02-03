//// [tests/cases/compiler/mergeSymbolReexportedTypeAliasInstantiation.ts] ////

//// [main.ts]
import {Row2, C} from '.'
const x: ((rowData: Row2<string>) => unknown) = (rowData: Row2<any>) => (null)
const y : C = { s: '' }

//// [a.d.ts]
import '.'
declare module '.' {
  type Row2<T> = {}
  type C = { s : string }
}

//// [index.d.ts]
export type {Row2} from './common';

//// [common.d.ts]
export interface Row2 {}

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = function (rowData) { return (null); };
var y = { s: '' };
