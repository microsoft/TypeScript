//// [noErrorsInCallback.ts]
class Bar {
    constructor(public foo: string) { }
}
var one = new Bar({}); // Error
[].forEach(() => {
    var two = new Bar({}); // No error?
});
 

//// [noErrorsInCallback.js]
var Bar = /** @class */ (function () {
    function Bar(foo) {
        this.foo = foo;
    }
    return Bar;
}());
var one = new Bar({}); // Error
[].forEach(function () {
    var two = new Bar({}); // No error?
});
