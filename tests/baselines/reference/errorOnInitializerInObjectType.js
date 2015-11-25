//// [errorOnInitializerInObjectType.ts]
interface Foo {
    bar: number = 5;
}

var Foo: {
    bar: number = 5;
};


//// [errorOnInitializerInObjectType.js]
var Foo;
