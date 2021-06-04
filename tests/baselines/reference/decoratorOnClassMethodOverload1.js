//// [decoratorOnClassMethodOverload1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec
    method()
    method() { }
}

const C1 = class {
    @dec
    method()
    method() { }
}


//// [decoratorOnClassMethodOverload1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    return C;
}());
var C1 = /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.method = function () { };
    return class_1;
}());
