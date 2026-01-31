//// [tests/cases/compiler/classExpressionWithDecorator1.ts] ////

//// [classExpressionWithDecorator1.ts]
var v = @decorate class C { static p = 1 };

//// [classExpressionWithDecorator1.js]
var _a;
var v = (_a = class C {
    },
    _a.p = 1,
    _a);
