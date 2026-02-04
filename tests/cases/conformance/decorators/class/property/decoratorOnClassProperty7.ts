// @strict: false
// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec(target: Function, propertyKey: string | symbol, paramIndex: number): void;

class C {
    @dec prop;
}