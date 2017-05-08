// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: ES5

declare const MyClassDecorator: ClassDecorator;
declare const MyMethodDecorator: MethodDecorator;

@MyClassDecorator
class A {
    constructor(hi: object) {}
    @MyMethodDecorator
    method(there: object) {}
}
