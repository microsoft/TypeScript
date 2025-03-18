//// [tests/cases/compiler/decoratorMetadataPromise.ts] ////

//// [decoratorMetadataPromise.ts]
declare const decorator: MethodDecorator;

class A {
    @decorator
    async foo() {}
    @decorator
    async bar(): Promise<number> { return 0; }
    @decorator
    baz(n: Promise<number>): Promise<number> { return n; }
}


//// [decoratorMetadataPromise.js]
class A {
    @decorator
    async foo() { }
    @decorator
    async bar() { return 0; }
    @decorator
    baz(n) { return n; }
}
