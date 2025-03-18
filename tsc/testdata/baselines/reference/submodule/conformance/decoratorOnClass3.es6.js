//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass3.es6.ts] ////

//// [decoratorOnClass3.es6.ts]
declare function dec<T>(target: T): T;

@dec
export default class C {
}

let c = new C();

//// [decoratorOnClass3.es6.js]
@dec
export default class C {
}
let c = new C();
