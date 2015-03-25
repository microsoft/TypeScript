// @target: ES5
declare function dec(target: Function, propertyKey: string | symbol, paramIndex: number): void;

class C {
    @dec prop;
}