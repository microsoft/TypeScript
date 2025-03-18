//// [tests/cases/conformance/decorators/decoratorInAmbientContext.ts] ////

//// [decoratorInAmbientContext.ts]
declare function decorator(target: any, key: any): any;

const b = Symbol('b');
class Foo {
    @decorator declare a: number;
    @decorator declare [b]: number;
}


//// [decoratorInAmbientContext.js]
const b = Symbol('b');
class Foo {
}
