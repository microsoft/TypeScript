//// [sourceMapValidationClasses.ts]
module Foo.Bar {
    "use strict";

    class Greeter {
        constructor(public greeting: string) {
        }

        greet() {
            return "<h1>" + this.greeting + "</h1>";
        }
    }


    function foo(greeting: string): Greeter {
        return new Greeter(greeting);
    }

    var greeter = new Greeter("Hello, world!");
    var str = greeter.greet();

    function foo2(greeting: string, ...restGreetings /* more greeting */: string[]) {
        var greeters: Greeter[] = []; /* inline block comment */
        greeters[0] = new Greeter(greeting);
        for (var i = 0; i < restGreetings.length; i++) {
            greeters.push(new Greeter(restGreetings[i]));
        }

        return greeters;
    }

    var b = foo2("Hello", "World", "!");
    // This is simple signle line comment
    for (var j = 0; j < b.length; j++) {
        b[j].greet();
    }
}

//// [sourceMapValidationClasses.js]
var Foo;
(function (Foo) {
    var Bar;
    (function (Bar) {
        "use strict";
        var Greeter = /** @class */ (function () {
            function Greeter(greeting) {
                this.greeting = greeting;
            }
            Greeter.prototype.greet = function () {
                return "<h1>" + this.greeting + "</h1>";
            };
            return Greeter;
        }());
        function foo(greeting) {
            return new Greeter(greeting);
        }
        var greeter = new Greeter("Hello, world!");
        var str = greeter.greet();
        function foo2(greeting) {
            var restGreetings /* more greeting */ = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restGreetings[_i - 1] = arguments[_i];
            }
            var greeters = []; /* inline block comment */
            greeters[0] = new Greeter(greeting);
            for (var i = 0; i < restGreetings.length; i++) {
                greeters.push(new Greeter(restGreetings[i]));
            }
            return greeters;
        }
        var b = foo2("Hello", "World", "!");
        // This is simple signle line comment
        for (var j = 0; j < b.length; j++) {
            b[j].greet();
        }
    })(Bar = Foo.Bar || (Foo.Bar = {}));
})(Foo || (Foo = {}));
//# sourceMappingURL=sourceMapValidationClasses.js.map