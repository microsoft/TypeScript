//// [decoratorOnClass13.ts]
declare function dec<T>(target: T): T;

module Outer {
  @dec
  export class C {
  }
}

//// [decoratorOnClass13.js]
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var Outer;
(function (Outer) {
    let C = class {
    };
    Object.defineProperty(C, "name", { value: "C", configurable: true });
    C = __decorate([dec], C);
    Outer.C = C;
})(Outer || (Outer = {}));
