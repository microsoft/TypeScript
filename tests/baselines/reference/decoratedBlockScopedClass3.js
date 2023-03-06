//// [a.ts]
function decorator() {
    return (target: new (...args: any[]) => any) => {}
}

@decorator()
class Foo {
    public static func(): Foo {
        return new Foo();
    }
}
Foo.func();

try {
    @decorator()
    class Foo {
        public static func(): Foo {
            return new Foo();
        }
    }
    Foo.func();
}
catch (e) {}


//// [a.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function decorator() {
    return function (target) { };
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo_1 = Foo;
    Foo.func = function () {
        return new Foo_1();
    };
    var Foo_1;
    Foo = Foo_1 = __decorate([
        decorator()
    ], Foo);
    return Foo;
}());
Foo.func();
try {
    var Foo_2 = /** @class */ (function () {
        function Foo() {
        }
        Foo_3 = Foo;
        Foo.func = function () {
            return new Foo_3();
        };
        var Foo_3;
        Foo = Foo_3 = __decorate([
            decorator()
        ], Foo);
        return Foo;
    }());
    Foo_2.func();
}
catch (e) { }
