// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: ES5

declare const MyClassDecorator: ClassDecorator;
declare const MyMethodDecorator: MethodDecorator;

@MyClassDecorator
class A {
    constructor(...args) {}
    @MyMethodDecorator
    method(...args) {}
}

@MyClassDecorator
class B {
    constructor(...args: number[]) {}
    @MyMethodDecorator
    method(this: this, ...args: string[]) {}
}
