//// [tests/cases/compiler/emitDecoratorMetadata_restArgs.ts] ////

//// [emitDecoratorMetadata_restArgs.ts]
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


//// [emitDecoratorMetadata_restArgs.js]
@MyClassDecorator
class A {
    constructor(...args) { }
    @MyMethodDecorator
    method(...args) { }
}
@MyClassDecorator
class B {
    constructor(...args) { }
    @MyMethodDecorator
    method(...args) { }
}
