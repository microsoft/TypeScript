// @target: ES2015
// @module: ES2015
// @experimentaldecorators: true
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

export default class {
    @dec get accessor() { return 1; }
}