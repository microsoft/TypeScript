//// [tests/cases/compiler/cannotInvokeNewOnErrorExpression.ts] ////

//// [cannotInvokeNewOnErrorExpression.ts]
namespace M
{
    class ClassA {}
}
var t = new M.ClassA[];

//// [cannotInvokeNewOnErrorExpression.js]
"use strict";
var M;
(function (M) {
    class ClassA {
    }
})(M || (M = {}));
var t = new M.ClassA[];
