//// [autolift3.ts]
class B {

    constructor() {
        function foo() {  }

        foo();

        var a = 0;
        var inner: any = (function() {
            var CScriptIO = (function() {
                var fso = 0

                return {
                    readFile: function(path: string): string {
                        return fso.toString();
                    }
                }
            })();
            return inner;
        })();
    }
}

var b = new B();

b.foo();





//// [autolift3.js]
var B = /** @class */ (function () {
    function B() {
        function foo() { }
        foo();
        var a = 0;
        var inner = (function () {
            var CScriptIO = (function () {
                var fso = 0;
                return {
                    readFile: function (path) {
                        return fso.toString();
                    }
                };
            })();
            return inner;
        })();
    }
    return B;
}());
var b = new B();
b.foo();
