// @target: es5
// @experimentaldecorators: true
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(@dec p: number) {}
}

const C1 = class {
    method(@dec p: number) {}
}
