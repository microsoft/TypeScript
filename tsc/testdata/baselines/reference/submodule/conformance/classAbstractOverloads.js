//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractOverloads.ts] ////

//// [classAbstractOverloads.ts]
abstract class A {
    abstract foo();
    abstract foo() : number;
    abstract foo();
    
    abstract bar();
    bar();
    abstract bar();
    
    abstract baz();
    baz();
    abstract baz();
    baz() {}
    
    qux();
}

abstract class B {
    abstract foo() : number;
    abstract foo();
    x : number;
    abstract foo();
    abstract foo();
}

//// [classAbstractOverloads.js]
"use strict";
class A {
    baz() { }
}
class B {
    x;
}
