// @target: es5
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
class A {
    @decorator
    public field1: -1 = -1;
}
function decorator(target: any, field: any) {}