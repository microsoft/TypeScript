// @target:es5, es2015
// @experimentaldecorators: true
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    constructor(@dec p: number) {}
}