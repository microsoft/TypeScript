//// [decoratorOnClassConstructor1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec constructor() {}
}

const C1 = class {
    @dec constructor() {}
}


//// [decoratorOnClassConstructor1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C1 = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
