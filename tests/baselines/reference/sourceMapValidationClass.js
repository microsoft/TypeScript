//// [sourceMapValidationClass.ts]
class Greeter {
    constructor(public greeting: string, ...b: string[]) {
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
    private x: string;
    private x1: number = 10;
    private fn() {
        return this.greeting;
    }
    get greetings() {
        return this.greeting;
    }
    set greetings(greetings: string) {
        this.greeting = greetings;
    }
}

//// [sourceMapValidationClass.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Greeter = (function () {
    function Greeter(greeting) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        this.greeting = greeting;
        this.x1 = 10;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    Greeter.prototype.fn = function () {
        return this.greeting;
    };
    Object.defineProperty(Greeter.prototype, "greetings", {
        get: function () {
            return this.greeting;
        },
        set: function (greetings) {
            this.greeting = greetings;
        },
        enumerable: true,
        configurable: true
    });
    __names(Greeter.prototype, ["greet", "fn"]);
    return Greeter;
}());
//# sourceMappingURL=sourceMapValidationClass.js.map