// @target: es5
// @experimentaldecorators: true
// @emitdecoratormetadata: true
declare function dec(): <T>(target: any, propertyKey: string) => void;

class A {
    @dec()
    foo: `${string}`
}
