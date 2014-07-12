//// [lambdaParamTypes.js]
var thing = create([{ name: "bob", id: 24 }, { name: "doug", id: 32 }]);

// Below should all be OK
thing.doSomething(function (x, y) {
    return x.name.charAt(0);
}); // x.name should be string, so should be OK
thing.doSomething(function (x, y) {
    return x.id.toExponential(0);
}); // x.id should be string, so should be OK
thing.doSomething(function (x, y) {
    return y.name.charAt(0);
}); // x.name should be string, so should be OK
thing.doSomething(function (x, y) {
    return y.id.toExponential(0);
}); // x.id should be string, so should be OK

// Below should all be in error
thing.doSomething(function (x, y) {
    return x.foo;
}); // no such property on x
thing.doSomething(function (x, y) {
    return y.foo;
}); // no such property on y
thing.doSomething(function (x, y) {
    return x.id.charAt(0);
}); // x.id should be number, no charAt member
thing.doSomething(function (x, y) {
    return x.name.toExponential(0);
}); // x.name should be string, no toExponential member
thing.doSomething(function (x, y) {
    return y.id.charAt(0);
});
thing.doSomething(function (x, y) {
    return y.name.toExponential(0);
});
