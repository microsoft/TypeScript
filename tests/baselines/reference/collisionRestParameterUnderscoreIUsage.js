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
var Foo = (function () {
    function Foo() {
        console.log(_i); // This should result in error
    }
    return Foo;
})();
new Foo();
