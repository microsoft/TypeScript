//// [tests/cases/compiler/topLevelLambda4.ts] ////

//// [topLevelLambda4.ts]
export var x = () => this.window;

//// [topLevelLambda4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x = () => this.window;
exports.x = x;
