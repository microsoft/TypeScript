//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass4.es6.ts] ////

//// [decoratorOnClass4.es6.ts]
declare function dec<T>(target: T): T;

@dec
export default class {
}

//// [decoratorOnClass4.es6.js]
@dec
export default class {
}
