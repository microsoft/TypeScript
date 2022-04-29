// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: es6

declare const decorator: MethodDecorator;

class A {
    @decorator
    async foo() {}
    @decorator
    async bar(): Promise<number> { return 0; }
    @decorator
    baz(n: Promise<number>): Promise<number> { return n; }
}
