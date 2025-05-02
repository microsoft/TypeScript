//// [tests/cases/compiler/lambdaParamTypes.ts] ////

//// [lambdaParamTypes.ts]
interface MyArrayWrapper<T> {
    constructor(initialItems?: T[]);
    doSomething(predicate: (x: T, y: T) => string): void;
}

declare function create<T>(initialValues?: T[]): MyArrayWrapper<T>;

var thing = create([{ name: "bob", id: 24 }, { name: "doug", id: 32 }]);

// Below should all be OK
thing.doSomething((x, y) => x.name.charAt(0));      // x.name should be string, so should be OK
thing.doSomething((x, y) => x.id.toExponential(0)); // x.id should be string, so should be OK
thing.doSomething((x, y) => y.name.charAt(0));      // x.name should be string, so should be OK
thing.doSomething((x, y) => y.id.toExponential(0)); // x.id should be string, so should be OK

// Below should all be in error
thing.doSomething((x, y) => x.foo); // no such property on x
thing.doSomething((x, y) => y.foo); // no such property on y
thing.doSomething((x, y) => x.id.charAt(0));      // x.id should be number, no charAt member
thing.doSomething((x, y) => x.name.toExponential(0)); // x.name should be string, no toExponential member
thing.doSomething((x, y) => y.id.charAt(0));
thing.doSomething((x, y) => y.name.toExponential(0));


//// [lambdaParamTypes.js]
var thing = create([{ name: "bob", id: 24 }, { name: "doug", id: 32 }]);
// Below should all be OK
thing.doSomething(function (x, y) { return x.name.charAt(0); }); // x.name should be string, so should be OK
thing.doSomething(function (x, y) { return x.id.toExponential(0); }); // x.id should be string, so should be OK
thing.doSomething(function (x, y) { return y.name.charAt(0); }); // x.name should be string, so should be OK
thing.doSomething(function (x, y) { return y.id.toExponential(0); }); // x.id should be string, so should be OK
// Below should all be in error
thing.doSomething(function (x, y) { return x.foo; }); // no such property on x
thing.doSomething(function (x, y) { return y.foo; }); // no such property on y
thing.doSomething(function (x, y) { return x.id.charAt(0); }); // x.id should be number, no charAt member
thing.doSomething(function (x, y) { return x.name.toExponential(0); }); // x.name should be string, no toExponential member
thing.doSomething(function (x, y) { return y.id.charAt(0); });
thing.doSomething(function (x, y) { return y.name.toExponential(0); });
