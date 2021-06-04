// @target: es5
// @experimentaldecorators: true
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    constructor(@dec p: number) {}
}

const C1 = class {
    constructor(@dec p: number) {}
}
