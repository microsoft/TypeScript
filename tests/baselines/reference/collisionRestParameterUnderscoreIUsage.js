//// [collisionRestParameterUnderscoreIUsage.ts]
declare var console: { log(msg?: string): void; };
var _i = "This is what I'd expect to see";
class Foo {
    constructor(...args: any[]) {
        console.log(_i); // This should result in error
    }
}
new Foo();

//// [collisionRestParameterUnderscoreIUsage.js]
var _i = "This is what I'd expect to see";
var Foo = /** @class */ (function () {
    function Foo() {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        console.log(_i); // This should result in error
    }
    return Foo;
}());
new Foo();
