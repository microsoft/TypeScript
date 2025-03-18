//// [tests/cases/conformance/es6/decorators/class/method/decoratorOnClassMethod1.es6.ts] ////

//// [decoratorOnClassMethod1.es6.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

export default class {
    @dec method() {}
}

//// [decoratorOnClassMethod1.es6.js]
export default class {
    @dec
    method() { }
}
