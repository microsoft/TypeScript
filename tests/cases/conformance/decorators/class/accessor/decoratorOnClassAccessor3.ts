// @target: es5
// @experimentaldecorators: true
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec get accessor() { return 1; }
}

const C1 = class {
    public @dec get accessor() { return 1; }
}
