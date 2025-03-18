//// [tests/cases/compiler/declarationEmitRetainedAnnotationRetainsImportInOutput.ts] ////

//// [index.d.ts]
export type Whatever<T> = {x: T};
export declare function something<T>(cb: () => Whatever<T>): Whatever<T>;

//// [index.ts]
import * as E from 'whatever';

export const run = <E>(i: () => E.Whatever<E>): E.Whatever<E> => E.something(i);

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const E = require("whatever");
const run = (i) => E.something(i);
exports.run = run;
