// @target: ES2015
// @module: ES2015
// @experimentaldecorators: true
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

export default class {
    method(@dec p: number) {}
}