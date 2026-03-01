//// [tests/cases/compiler/collisionThisExpressionAndVarInGlobal.ts] ////

//// [collisionThisExpressionAndVarInGlobal.ts]
var _this = 1;
var f = () => this;

//// [collisionThisExpressionAndVarInGlobal.js]
"use strict";
var _this = 1;
var f = () => this;
