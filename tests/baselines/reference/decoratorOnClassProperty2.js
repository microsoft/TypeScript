//// [decoratorOnClassProperty2.ts]
declare function dec(target: any, propertyKey: string): void;

class C {
    @dec public prop;
}

//// [decoratorOnClassProperty2.js]
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
var C = (function () {
    function C() {
    }
    __decorate([dec], C.prototype, "prop");
    return C;
})();
