//// [tests/cases/compiler/classExpressionWithDecorator1.ts] ////

//// [classExpressionWithDecorator1.ts]
var v = @decorate class C { static p = 1 };

//// [classExpressionWithDecorator1.js]
var v = 
@decorate
class C {
    static p = 1;
};
