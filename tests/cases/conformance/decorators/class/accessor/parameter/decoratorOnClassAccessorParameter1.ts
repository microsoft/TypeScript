// @target:es5
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    set accessor(@dec p: number) {}
}