// @target:es5
// @experimentaldecorators: true
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    constructor(public @dec p: number) {}
}