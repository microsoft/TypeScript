// @target: ES5
// @experimentaldecorators: true
declare function dec(target: Function, propertyKey: string | symbol, paramIndex: number): void;

class C {
    @dec prop;
}