//// [tests/cases/compiler/classExpressionExtendingAbstractClass.ts] ////

//// [classExpressionExtendingAbstractClass.ts]
abstract class A {
    abstract foo(): void;
}

var C = class extends A {     // no error reported!
};



//// [classExpressionExtendingAbstractClass.js]
class A {
}
var C = class extends A {
};
