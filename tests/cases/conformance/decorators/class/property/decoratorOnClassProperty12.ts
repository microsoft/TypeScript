// @target: ES5
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<number>;

class C {
    @dec prop;
}