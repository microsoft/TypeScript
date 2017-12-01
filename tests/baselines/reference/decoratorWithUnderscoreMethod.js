//// [decoratorWithUnderscoreMethod.ts]
declare var console : { log(arg: string): void };
function dec(): Function {
    return function (target: any, propKey: string, descr: PropertyDescriptor): void {
        console.log(target[propKey]);
        //logs undefined
        //propKey has three underscores as prefix, but the method has only two underscores
    };
}

class A {
    @dec()
    private __foo(bar: string): void {
        // do something with bar
    }
}

//// [decoratorWithUnderscoreMethod.js]
function dec() {
    return function (target, propKey, descr) {
        console.log(target[propKey]);
        //logs undefined
        //propKey has three underscores as prefix, but the method has only two underscores
    };
}
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.__foo = function (bar) {
        // do something with bar
    };
    __decorate([
        dec()
    ], A.prototype, "__foo");
    return A;
}());
