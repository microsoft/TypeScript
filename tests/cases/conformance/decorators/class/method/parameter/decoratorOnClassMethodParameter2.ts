// @target:es5
// @experimentaldecorators: true
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(this: C, @dec p: number) {}
}