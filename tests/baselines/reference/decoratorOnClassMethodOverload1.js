//// [decoratorOnClassMethodOverload1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
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
