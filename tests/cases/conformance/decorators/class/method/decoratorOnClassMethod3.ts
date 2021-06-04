// @target: ES5
// @experimentaldecorators: true
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec method() {}
}

const C1 = class {
    public @dec method() {}
}
