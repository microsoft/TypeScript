//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithSuperMethodCall01.ts] ////

//// [emitClassDeclarationWithSuperMethodCall01.ts]
class Parent {
    foo() {
    }
}

class Foo extends Parent {
    foo() {
        var x = () => super.foo();
    }
}

//// [emitClassDeclarationWithSuperMethodCall01.js]
"use strict";
class Parent {
    foo() {
    }
}
class Foo extends Parent {
    foo() {
        var x = () => super.foo();
    }
}
