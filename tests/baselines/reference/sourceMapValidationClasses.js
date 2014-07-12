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
    (function (Bar) {
        "use strict";

        var Greeter = (function () {
            function Greeter(greeting) {
                this.greeting = greeting;
            }
            Greeter.prototype.greet = function () {
                return "<h1>" + this.greeting + "</h1>";
            };
            return Greeter;
        })();

        function foo(greeting) {
            return new Greeter(greeting);
        }

        var greeter = new Greeter("Hello, world!");
        var str = greeter.greet();

        function foo2(greeting) {
            var restGreetings = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                restGreetings[_i] = arguments[_i + 1];
            }
            var greeters = [];
            greeters[0] = new Greeter(greeting);
            for (var i = 0; i < restGreetings.length; i++) {
                greeters.push(new Greeter(restGreetings[i]));
            }

            return greeters;
        }

        var b = foo2("Hello", "World", "!");

        for (var j = 0; j < b.length; j++) {
            b[j].greet();
        }
    })(Foo.Bar || (Foo.Bar = {}));
    var Bar = Foo.Bar;
})(Foo || (Foo = {}));
//# sourceMappingURL=sourceMapValidationClasses.js.map
