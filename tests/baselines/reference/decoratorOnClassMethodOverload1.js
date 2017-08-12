//// [decoratorOnClassMethodOverload1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec
    method()
    method() { }
}

//// [decoratorOnClassMethodOverload1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.method = function () { };
    return C;
}());
