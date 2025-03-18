//// [tests/cases/compiler/emitDecoratorMetadata_object.ts] ////

//// [emitDecoratorMetadata_object.ts]
declare const MyClassDecorator: ClassDecorator;
declare const MyMethodDecorator: MethodDecorator;

@MyClassDecorator
class A {
    constructor(hi: object) {}
    @MyMethodDecorator
    method(there: object) {}
}


//// [emitDecoratorMetadata_object.js]
@MyClassDecorator
class A {
    constructor(hi) { }
    @MyMethodDecorator
    method(there) { }
}
