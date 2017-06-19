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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.baz = function () { };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
