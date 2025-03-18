//// [tests/cases/conformance/es6/decorators/class/property/decoratorOnClassProperty1.es6.ts] ////

//// [decoratorOnClassProperty1.es6.ts]
declare function dec(target: any, propertyKey: string): void;

export default class {
    @dec prop;
}

//// [decoratorOnClassProperty1.es6.js]
export default class {
    @dec
    prop;
}
