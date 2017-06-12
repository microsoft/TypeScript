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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.baz = function () { };
    return A;
}());
var B = (function () {
    function B() {
    }
    return B;
}());
