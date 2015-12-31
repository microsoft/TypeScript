//@noImplicitAny: true
var foo: () => [any] = function bar() {
    let intermediate = bar();
    intermediate = [""];
    return [undefined];
};