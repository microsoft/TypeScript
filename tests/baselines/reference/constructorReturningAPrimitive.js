//// [constructorReturningAPrimitive.ts]
// technically not allowed by JavaScript but we don't have a 'not-primitive' constraint
// functionally only possible when your class is otherwise devoid of members so of little consequence in practice

class A {
    constructor() {
        return 1;
    }
}

var a = new A();

class B<T> {
    constructor() {
        var x: T;
        return x;
    }
}

var b = new B<number>();

//// [constructorReturningAPrimitive.js]
// technically not allowed by JavaScript but we don't have a 'not-primitive' constraint
// functionally only possible when your class is otherwise devoid of members so of little consequence in practice
var A = /** @class */ (function () {
    function A() {
        return 1;
    }
    return A;
}());
var a = new A();
var B = /** @class */ (function () {
    function B() {
        var x;
        return x;
    }
    return B;
}());
var b = new B();
