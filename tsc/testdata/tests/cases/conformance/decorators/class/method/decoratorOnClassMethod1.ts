// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec method() {}
}