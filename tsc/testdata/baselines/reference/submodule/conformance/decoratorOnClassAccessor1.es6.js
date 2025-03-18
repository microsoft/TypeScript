//// [tests/cases/conformance/es6/decorators/class/accessor/decoratorOnClassAccessor1.es6.ts] ////

//// [decoratorOnClassAccessor1.es6.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

export default class {
    @dec get accessor() { return 1; }
}

//// [decoratorOnClassAccessor1.es6.js]
export default class {
    @dec
    get accessor() { return 1; }
}
