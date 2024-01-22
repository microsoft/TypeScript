//// [tests/cases/compiler/expandoFunctionBlockShadowing.ts] ////

//// [expandoFunctionBlockShadowing.ts]
// https://github.com/microsoft/TypeScript/issues/56538

export function X() {}
if (Math.random()) {
  const X: { test?: any } = {};
  X.test = 1;
}

export function Y() {}
Y.test = "foo";
const aliasTopY = Y;
if (Math.random()) {
  const Y = function Y() {}
  Y.test = 42;

  const topYcheck: { (): void; test: string } = aliasTopY;
  const blockYcheck: { (): void; test: number } = Y;
}

//// [expandoFunctionBlockShadowing.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/56538
Object.defineProperty(exports, "__esModule", { value: true });
exports.Y = exports.X = void 0;
function X() { }
exports.X = X;
if (Math.random()) {
    var X_1 = {};
    X_1.test = 1;
}
function Y() { }
exports.Y = Y;
Y.test = "foo";
var aliasTopY = Y;
if (Math.random()) {
    var Y_1 = function Y() { };
    Y_1.test = 42;
    var topYcheck = aliasTopY;
    var blockYcheck = Y_1;
}


//// [expandoFunctionBlockShadowing.d.ts]
export declare function X(): void;
export declare function Y(): void;
export declare namespace Y {
    var test: string;
}
