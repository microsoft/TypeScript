//// [tests/cases/compiler/moduleLocalImportNotIncorrectlyRedirected.ts] ////

//// [package.json]
{
"name": "troublesome-lib",
"typings": "lib/index.d.ts",
"version": "0.0.1"
}
//// [index.d.ts]
import { Position } from './utilities/positioning';
export interface ISpinButton {}
//// [positioning.d.ts]
export * from './positioning/index';
//// [index.d.ts]
export declare enum Position {
    top,
}
//// [index.ts]
import { ISpinButton } from "troublesome-lib";

//// [index.js]
"use strict";
exports.__esModule = true;
