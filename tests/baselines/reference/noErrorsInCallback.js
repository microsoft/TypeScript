//// [tests/cases/compiler/noErrorsInCallback.ts] ////

//// [noErrorsInCallback.ts]
class Bar {
    constructor(public foo: string) { }
}
var one = new Bar({}); // Error
[].forEach(() => {
    var two = new Bar({}); // No error?
});
 

//// [noErrorsInCallback.js]
class Bar {
    constructor(foo) {
        this.foo = foo;
    }
}
var one = new Bar({}); // Error
[].forEach(() => {
    var two = new Bar({}); // No error?
});
