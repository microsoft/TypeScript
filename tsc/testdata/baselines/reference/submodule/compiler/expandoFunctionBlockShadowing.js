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
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = X;
exports.Y = Y;
// https://github.com/microsoft/TypeScript/issues/56538
function X() { }
if (Math.random()) {
    const X = {};
    X.test = 1;
}
function Y() { }
Y.test = "foo";
const aliasTopY = Y;
if (Math.random()) {
    const Y = function Y() { };
    Y.test = 42;
    const topYcheck = aliasTopY;
    const blockYcheck = Y;
}
