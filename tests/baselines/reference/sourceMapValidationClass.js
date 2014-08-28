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
var Greeter = (function () {
    function Greeter(greeting) {
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
    return Greeter;
})();
//# sourceMappingURL=sourceMapValidationClass.js.map