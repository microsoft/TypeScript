//// [tests/cases/compiler/typeOfPrototype.ts] ////

//// [typeOfPrototype.ts]
class Foo {
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK


//// [typeOfPrototype.js]
class Foo {
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK
